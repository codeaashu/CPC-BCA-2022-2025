package hotel.management.system;

import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import java.sql.*;

public class UpdateCheck extends JFrame {
    private JPanel contentPane;
    private JTextField txtRoomNumber, txtName, txtCheckedIn, txtDeposit, txtPending;
    private Choice guestIdChoice;

    public static void main(String[] args) {
        EventQueue.invokeLater(() -> {
            try {
                UpdateCheck frame = new UpdateCheck();
                frame.setVisible(true);
            } catch (Exception e) {
                e.printStackTrace();
            }
        });
    }

    public UpdateCheck() {
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setBounds(500, 200, 950, 500);
        contentPane = new JPanel();
        contentPane.setLayout(null);
        setContentPane(contentPane);

        JLabel lblTitle = new JLabel("Check-In Details");
        lblTitle.setFont(new Font("Tahoma", Font.BOLD, 20));
        lblTitle.setBounds(124, 11, 222, 25);
        contentPane.add(lblTitle);

        JLabel lblId = new JLabel("Guest ID:");
        lblId.setBounds(25, 88, 100, 20);
        contentPane.add(lblId);

        guestIdChoice = new Choice();
        guestIdChoice.setBounds(248, 85, 140, 20);
        contentPane.add(guestIdChoice);

        try {
            conn c = new conn();
            ResultSet rs = c.s.executeQuery("SELECT number FROM customer");
            while (rs.next()) {
                guestIdChoice.add(rs.getString("number"));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        JLabel lblRoom = new JLabel("Room Number:");
        lblRoom.setBounds(25, 129, 120, 20);
        contentPane.add(lblRoom);

        txtRoomNumber = new JTextField();
        txtRoomNumber.setBounds(248, 126, 140, 20);
        contentPane.add(txtRoomNumber);

        JLabel lblName = new JLabel("Name:");
        lblName.setBounds(25, 174, 120, 20);
        contentPane.add(lblName);

        txtName = new JTextField();
        txtName.setBounds(248, 171, 140, 20);
        contentPane.add(txtName);

        JLabel lblCheckedIn = new JLabel("Checked-in:");
        lblCheckedIn.setBounds(25, 216, 120, 20);
        contentPane.add(lblCheckedIn);

        txtCheckedIn = new JTextField();
        txtCheckedIn.setBounds(248, 216, 140, 20);
        contentPane.add(txtCheckedIn);

        JLabel lblDeposit = new JLabel("Amount Paid (Rs):");
        lblDeposit.setBounds(25, 261, 140, 20);
        contentPane.add(lblDeposit);

        txtDeposit = new JTextField();
        txtDeposit.setBounds(248, 258, 140, 20);
        contentPane.add(txtDeposit);

        JLabel lblPending = new JLabel("Pending Amount (Rs):");
        lblPending.setBounds(25, 302, 160, 20);
        contentPane.add(lblPending);

        txtPending = new JTextField();
        txtPending.setBounds(248, 299, 140, 20);
        contentPane.add(txtPending);

        JButton btnCheck = new JButton("Check");
        btnCheck.setBounds(56, 378, 89, 25);
        btnCheck.setBackground(Color.BLACK);
        btnCheck.setForeground(Color.WHITE);
        contentPane.add(btnCheck);

        JButton btnUpdate = new JButton("Update");
        btnUpdate.setBounds(168, 378, 89, 25);
        btnUpdate.setBackground(Color.BLACK);
        btnUpdate.setForeground(Color.WHITE);
        contentPane.add(btnUpdate);

        JButton btnBack = new JButton("Back");
        btnBack.setBounds(281, 378, 89, 25);
        btnBack.setBackground(Color.BLACK);
        btnBack.setForeground(Color.WHITE);
        contentPane.add(btnBack);

        ImageIcon i1 = new ImageIcon(ClassLoader.getSystemResource("icons/nine.jpg"));
        JLabel l1 = new JLabel(i1);
        l1.setBounds(450, 70, 476, 270);
        add(l1);

        getContentPane().setBackground(Color.WHITE);

        // Action listeners
        btnCheck.addActionListener(e -> {
            String guestId = guestIdChoice.getSelectedItem();
            try {
                conn c = new conn();
                ResultSet rs = c.s.executeQuery("SELECT * FROM customer WHERE number = '" + guestId + "'");
                if (rs.next()) {
                    txtRoomNumber.setText(rs.getString("room"));
                    txtName.setText(rs.getString("name"));
                    txtCheckedIn.setText(rs.getString("status"));
                    txtDeposit.setText(rs.getString("deposit"));
                }

                // Now get room price and calculate pending
                ResultSet rs2 = c.s.executeQuery("SELECT price FROM room WHERE room_number = '" + txtRoomNumber.getText() + "'");
                if (rs2.next()) {
                    int total = Integer.parseInt(rs2.getString("price"));
                    int paid = Integer.parseInt(txtDeposit.getText());
                    int pending = total - paid;
                    txtPending.setText(String.valueOf(pending));
                }

            } catch (Exception ex) {
                ex.printStackTrace();
                JOptionPane.showMessageDialog(null, "Error fetching data.");
            }
        });

        btnUpdate.addActionListener(e -> {
            String guestId = guestIdChoice.getSelectedItem();
            try {
                conn c = new conn();
                String updateQuery = "UPDATE customer SET room = '" + txtRoomNumber.getText() +
                        "', name = '" + txtName.getText() +
                        "', status = '" + txtCheckedIn.getText() +
                        "', deposit = '" + txtDeposit.getText() +
                        "' WHERE number = '" + guestId + "'";
                c.s.executeUpdate(updateQuery);

                JOptionPane.showMessageDialog(null, "Data Updated Successfully");
                new Reception().setVisible(true);
                setVisible(false);
            } catch (Exception ex) {
                ex.printStackTrace();
                JOptionPane.showMessageDialog(null, "Update Failed.");
            }
        });

        btnBack.addActionListener(e -> {
            new Reception().setVisible(true);
            setVisible(false);
        });
    }
}
