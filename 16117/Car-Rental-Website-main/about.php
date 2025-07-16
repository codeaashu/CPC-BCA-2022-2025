<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>About Us - SLMoto</title>
    <link rel="stylesheet" href="Css/homepage.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <style>
        :root {
            --primary-color: #e74c3c;
            --secondary-color: #2c3e50;
            --accent-color: #3498db;
            --text-color: #333;
            --light-bg: #f8f9fa;
        }

        .about-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
            color: var(--text-color);
        }

        .hero-section {
            text-align: center;
            padding: 120px 0;
            background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('Images/homepageback.jpg') fixed;
            background-size: cover;
            background-position: center;
            color: white;
            margin-bottom: 60px;
            position: relative;
            overflow: hidden;
        }

        .hero-section::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.3);
            transform: translateZ(0);
        }

        .hero-content {
            position: relative;
            z-index: 1;
            transform: translateZ(0);
        }

        .hero-section h1 {
            font-size: 3em;
            margin-bottom: 20px;
        }

        .stats-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 30px;
            margin: 40px 0;
        }

        .stat-box {
            text-align: center;
            padding: 30px;
            background: white;
            border-radius: 20px;
            transition: all 0.3s ease;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            border: 1px solid rgba(0,0,0,0.05);
            position: relative;
            overflow: hidden;
        }

        .stat-icon {
            font-size: 1.2em;
            color: var(--primary-color);
            margin-bottom: 20px;
            position: relative;
            z-index: 1;
        }

        .stat-content {
            position: relative;
            z-index: 1;
        }

        .stat-box:hover {
            transform: translateY(-10px);
            box-shadow: 0 15px 40px rgba(0,0,0,0.15);
        }

        .stat-number {
            font-size: 2.5em;
            color: var(--primary-color);
            margin: 10px 0;
            font-weight: bold;
        }

        .stat-progress {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background: linear-gradient(to right, var(--primary-color), var(--accent-color));
            transform: scaleX(0);
            transform-origin: left;
            transition: transform 0.8s ease-out;
        }

        .stat-box:hover .stat-progress {
            transform: scaleX(1);
        }

        .team-section {
            margin: 60px 0;
        }

        .team-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 30px;
            margin-top: 30px;
        }

        .team-member {
            text-align: center;
            padding: 30px;
            background: white;
            border-radius: 20px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
            border: 1px solid rgba(0,0,0,0.05);
        }

        .team-member::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 5px;
            background: var(--primary-color);
            transform: scaleX(0);
            transition: transform 0.3s ease;
            transform-origin: right;
        }

        .team-member:hover {
            transform: translateY(-10px);
            box-shadow: 0 15px 40px rgba(0,0,0,0.15);
        }

        .team-member:hover::after {
            transform: scaleX(1);
            transform-origin: left;
        }

        .team-member img {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            margin-bottom: 15px;
            object-fit: cover;
        }

        .social-links {
            margin-top: 15px;
        }

        .social-links a {
            color: #333;
            margin: 0 10px;
            font-size: 1.2em;
            transition: color 0.3s;
        }

        .social-links a:hover {
            color: #e74c3c;
        }

        .timeline {
            position: relative;
            max-width: 1000px;
            margin: 60px auto;
            padding: 40px 20px;
            background: var(--light-bg);
            border-radius: 20px;
        }

        .timeline::after {
            content: '';
            position: absolute;
            width: 4px;
            background: linear-gradient(to bottom, var(--primary-color), var(--accent-color));
            top: 20px;
            bottom: 20px;
            left: 50%;
            margin-left: -2px;
            border-radius: 2px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }

        .timeline-item {
            padding: 20px 40px;
            position: relative;
            width: 50%;
            opacity: 0;
            transform: translateX(-100px);
            transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .timeline-item::before {
            content: '';
            position: absolute;
            width: 20px;
            height: 20px;
            background: white;
            border: 4px solid var(--primary-color);
            border-radius: 50%;
            top: 50%;
            transform: translateY(-50%);
            right: -10px;
            z-index: 1;
            transition: all 0.3s ease;
        }

        .timeline-item:nth-child(even)::before {
            left: -10px;
        }

        .timeline-item.visible {
            opacity: 1;
            transform: translateX(0);
        }

        .timeline-item:nth-child(even) {
            left: 50%;
            transform: translateX(100px);
        }

        .timeline-item:nth-child(even).visible {
            transform: translateX(0);
        }

        .timeline-content {
            padding: 30px;
            background: white;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            position: relative;
            transition: transform 0.3s ease;
        }

        .timeline-content:hover {
            transform: translateY(-5px);
        }

        .timeline-content h3 {
            margin-top: 0;
            color: var(--primary-color);
            font-size: 1.5em;
            position: relative;
            padding-bottom: 10px;
        }

        .timeline-content h3::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 50px;
            height: 3px;
            background: var(--primary-color);
            border-radius: 2px;
        }

        @media (max-width: 768px) {
            .timeline::after {
                left: 31px;
            }

            .timeline-item {
                width: 100%;
                padding-left: 70px;
                padding-right: 25px;
            }

            .timeline-item:nth-child(even) {
                left: 0;
            }
        }
    </style>
</head>
<body>
    <?php include 'navbar.php'; ?>

    <div class="hero-section">
        <div class="hero-content">
            <h1>About SLMoto</h1>
            <p class="hero-subtitle">Your Trusted Partner in Vehicle Rentals Since 2020</p>
            <a href="#our-story" class="scroll-down">
                <span>Discover Our Story</span>
                <i class="fas fa-chevron-down"></i>
            </a>
        </div>
    </div>

    <div class="about-container">
        <div class="stats-container">
            <div class="stat-box">
                <div class="stat-icon">
                    <i class="fas fa-car fa-2x"></i>
                </div>
                <div class="stat-content">
                    <div class="stat-number" data-target="500">0</div>
                    <p>Vehicles Available</p>
                </div>
                <div class="stat-progress"></div>
            </div>
            <div class="stat-box">
                <div class="stat-icon">
                    <i class="fas fa-users fa-2x"></i>
                </div>
                <div class="stat-content">
                    <div class="stat-number" data-target="1000">0</div>
                    <p>Happy Customers</p>
                </div>
                <div class="stat-progress"></div>
            </div>
            <div class="stat-box">
                <div class="stat-icon">
                    <i class="fas fa-map-marker-alt fa-2x"></i>
                </div>
                <div class="stat-content">
                    <div class="stat-number" data-target="50">0</div>
                    <p>Locations</p>
                </div>
                <div class="stat-progress"></div>
            </div>
            <div class="stat-box">
                <div class="stat-icon">
                    <i class="fas fa-star fa-2x"></i>
                </div>
                <div class="stat-content">
                    <div class="stat-number" data-target="98">0</div>
                    <p>Satisfaction Rate</p>
                </div>
                <div class="stat-progress"></div>
            </div>
        </div>

        <div class="team-section">
            <h2>Meet Our Team</h2>
            <div class="team-grid">
                <div class="team-member">
                    <img src="Images/team1.jpg" alt="Team Member 1">
                    <h3>John Doe</h3>
                    <p>CEO & Founder</p>
                    <div class="social-links">
                        <a href="#"><i class="fab fa-linkedin"></i></a>
                        <a href="#"><i class="fab fa-twitter"></i></a>
                        <a href="#"><i class="fab fa-facebook"></i></a>
                    </div>
                </div>
                <div class="team-member">
                    <img src="Images/team2.jpg" alt="Team Member 2">
                    <h3>Jane Smith</h3>
                    <p>Operations Manager</p>
                    <div class="social-links">
                        <a href="#"><i class="fab fa-linkedin"></i></a>
                        <a href="#"><i class="fab fa-twitter"></i></a>
                        <a href="#"><i class="fab fa-facebook"></i></a>
                    </div>
                </div>
                <div class="team-member">
                    <img src="Images/team3.jpg" alt="Team Member 3">
                    <h3>Mike Johnson</h3>
                    <p>Customer Relations</p>
                    <div class="social-links">
                        <a href="#"><i class="fab fa-linkedin"></i></a>
                        <a href="#"><i class="fab fa-twitter"></i></a>
                        <a href="#"><i class="fab fa-facebook"></i></a>
                    </div>
                </div>
            </div>
        </div>

        <div class="timeline">
            <div class="timeline-item">
                <div class="timeline-content">
                    <h3>2020</h3>
                    <p>Founded SLMoto with a small fleet of 10 vehicles</p>
                </div>
            </div>
            <div class="timeline-item">
                <div class="timeline-content">
                    <h3>2021</h3>
                    <p>Expanded to 5 locations across the city</p>
                </div>
            </div>
            <div class="timeline-item">
                <div class="timeline-content">
                    <h3>2022</h3>
                    <p>Launched our mobile app for easier bookings</p>
                </div>
            </div>
            <div class="timeline-item">
                <div class="timeline-content">
                    <h3>2023</h3>
                    <p>Reached milestone of 1000+ satisfied customers</p>
                </div>
            </div>
        </div>
    </div>

    <style>
        html {
            scroll-behavior: smooth;
        }

        .hero-subtitle {
            font-size: 1.5em;
            margin: 20px 0 40px;
            opacity: 0.9;
        }

        .scroll-down {
            display: inline-flex;
            flex-direction: column;
            align-items: center;
            color: white;
            text-decoration: none;
            margin-top: 30px;
            transition: transform 0.3s ease;
        }

        .scroll-down span {
            margin-bottom: 10px;
            font-size: 1.1em;
        }

        .scroll-down i {
            animation: bounce 2s infinite;
        }

        .scroll-down:hover {
            transform: translateY(5px);
        }

        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
                transform: translateY(0);
            }
            40% {
                transform: translateY(-10px);
            }
            60% {
                transform: translateY(-5px);
            }
        }
    </style>

    <script>
        // Animate statistics with easing
        const stats = document.querySelectorAll('.stat-number');
        
        const easeOutQuad = t => t * (2 - t);
        
        const animateStats = () => {
            stats.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                let current = 0;
                const duration = 2000; // 2 seconds
                const startTime = performance.now();

                const updateStat = (currentTime) => {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    current = Math.round(target * easeOutQuad(progress));
                    stat.innerText = current;

                    if (progress < 1) {
                        requestAnimationFrame(updateStat);
                    } else {
                        stat.innerText = target;
                        // Add animation class to parent stat-box for progress bar
                        stat.closest('.stat-box').classList.add('animate');
                    }
                };

                requestAnimationFrame(updateStat);
            });
        };

        // Enhanced Intersection Observer for timeline items
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Add stagger effect for multiple items
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 200;
                    entry.target.style.transitionDelay = `${delay}ms`;
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        });

        document.querySelectorAll('.timeline-item').forEach((item) => {
            observer.observe(item);
        });

        // Enhanced stats observer with threshold
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(animateStats, 300); // Slight delay for better visual effect
                    statsObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.3
        });

        document.querySelectorAll('.stats-section').forEach((section) => {
            statsObserver.observe(section);
        });

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    </script>
</body>
</html>