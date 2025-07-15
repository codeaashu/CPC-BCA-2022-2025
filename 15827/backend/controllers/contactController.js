const Contact = require('../models/Contact');
const ActivityLog = require('../models/ActivityLog');

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
exports.submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }

    // Email validation
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please enter a valid email address' 
      });
    }

    // Create contact submission
    const contact = await Contact.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject,
      message: message.trim()
    });

    // Log activity if user is authenticated
    if (req.user && req.user._id) {
      await ActivityLog.create({
        user: req.user._id,
        action: 'submit_contact',
        details: `Submitted contact form: ${contact._id}`
      });
    }

    res.status(201).json({
      success: true,
      message: 'Your message has been submitted successfully. We\'ll get back to you within 24 hours.',
      contact: {
        id: contact._id,
        name: contact.name,
        email: contact.email,
        subject: contact.subjectDisplay,
        message: contact.message,
        status: contact.status,
        createdAt: contact.createdAt
      }
    });

  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting contact form. Please try again.'
    });
  }
};

// @desc    Get all contact submissions (Admin only)
// @route   GET /api/contact
// @access  Private/Admin
exports.getAllContacts = async (req, res) => {
  try {
    const { status, priority, subject, page = 1, limit = 10 } = req.query;
    
    // Build filter object
    const filter = {};
    if (status && status !== 'all') filter.status = status;
    if (priority && priority !== 'all') filter.priority = priority;
    if (subject && subject !== 'all') filter.subject = subject;

    const skip = (page - 1) * limit;
    
    const contacts = await Contact.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate('resolvedBy', 'name');

    const total = await Contact.countDocuments(filter);

    res.json({
      success: true,
      contacts,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    });

  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching contact submissions'
    });
  }
};

// @desc    Get contact by ID (Admin only)
// @route   GET /api/contact/:id
// @access  Private/Admin
exports.getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id)
      .populate('resolvedBy', 'name');

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact submission not found'
      });
    }

    res.json({
      success: true,
      contact
    });

  } catch (error) {
    console.error('Get contact by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching contact submission'
    });
  }
};

// @desc    Update contact status (Admin only)
// @route   PUT /api/contact/:id
// @access  Private/Admin
exports.updateContact = async (req, res) => {
  try {
    const { status, priority, adminNotes } = req.body;
    
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact submission not found'
      });
    }

    // Update fields
    if (status) contact.status = status;
    if (priority) contact.priority = priority;
    if (adminNotes !== undefined) contact.adminNotes = adminNotes;

    // If status is resolved, set resolvedBy and resolvedAt
    if (status === 'resolved' && !contact.resolvedBy) {
      contact.resolvedBy = req.user._id;
      contact.resolvedAt = new Date();
    }

    await contact.save();

    // Log activity
    await ActivityLog.create({
      user: req.user._id,
      action: 'update_contact',
      details: `Updated contact ${contact._id} status to ${status}`
    });

    res.json({
      success: true,
      message: 'Contact submission updated successfully',
      contact
    });

  } catch (error) {
    console.error('Update contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating contact submission'
    });
  }
};

// @desc    Delete contact submission (Admin only)
// @route   DELETE /api/contact/:id
// @access  Private/Admin
exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact submission not found'
      });
    }

    await Contact.findByIdAndDelete(req.params.id);

    // Log activity
    await ActivityLog.create({
      user: req.user._id,
      action: 'delete_contact',
      details: `Deleted contact submission: ${contact._id}`
    });

    res.json({
      success: true,
      message: 'Contact submission deleted successfully'
    });

  } catch (error) {
    console.error('Delete contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting contact submission'
    });
  }
};

// @desc    Get contact statistics (Admin only)
// @route   GET /api/contact/stats
// @access  Private/Admin
exports.getContactStats = async (req, res) => {
  try {
    const stats = await Contact.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          new: { $sum: { $cond: [{ $eq: ['$status', 'new'] }, 1, 0] } },
          inProgress: { $sum: { $cond: [{ $eq: ['$status', 'in_progress'] }, 1, 0] } },
          resolved: { $sum: { $cond: [{ $eq: ['$status', 'resolved'] }, 1, 0] } },
          closed: { $sum: { $cond: [{ $eq: ['$status', 'closed'] }, 1, 0] } },
          urgent: { $sum: { $cond: [{ $eq: ['$priority', 'urgent'] }, 1, 0] } },
          high: { $sum: { $cond: [{ $eq: ['$priority', 'high'] }, 1, 0] } }
        }
      }
    ]);

    const subjectStats = await Contact.aggregate([
      {
        $group: {
          _id: '$subject',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);

    res.json({
      success: true,
      stats: stats[0] || {
        total: 0,
        new: 0,
        inProgress: 0,
        resolved: 0,
        closed: 0,
        urgent: 0,
        high: 0
      },
      subjectStats
    });

  } catch (error) {
    console.error('Get contact stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching contact statistics'
    });
  }
}; 