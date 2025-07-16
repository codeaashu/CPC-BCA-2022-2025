package hotel.management.system;

import java.awt.*;
import javax.swing.*;
import javax.swing.border.EmptyBorder;
import java.awt.event.*;
import java.sql.*;
import net.proteanit.sql.DbUtils;


public class Room extends JFrame {

    private JPanel contentPane;
    private JTable table;

    public Room() {
        setTitle("All Rooms");
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setBounds(450, 200, 1100, 600);
        contentPane = new JPanel();
        contentPane.setLayout(null);
        contentPane.setBackground(Color.WHITE);
        setContentPane(contentPane);

        // Room Table
        table = new JTable();
        JScrollPane scrollPane = new JScrollPane(table);
        scrollPane.setBounds(20, 50, 460, 350);
        contentPane.add(scrollPane);

        // Labels above the table
        JLabel lblRoomNumber = new JLabel("Room No");
        lblRoomNumber.setBounds(25, 20, 80, 20);
        contentPane.add(lblRoomNumber);

        JLabel lblAvailability = new JLabel("Availability");
        lblAvailability.setBounds(110, 20, 80, 20);
        contentPane.add(lblAvailability);

        JLabel lblCleanStatus = new JLabel("Clean Status");
        lblCleanStatus.setBounds(210, 20, 100, 20);
        contentPane.add(lblCleanStatus);

        JLabel lblPrice = new JLabel("Price");
        lblPrice.setBounds(320, 20, 50, 20);
        contentPane.add(lblPrice);

        JLabel lblBedType = new JLabel("Bed Type");
        lblBedType.setBounds(390, 20, 100, 20);
        contentPane.add(lblBedType);

        // Load Data Button
        JButton btnLoad = new JButton("Load Data");
        btnLoad.setBounds(80, 420, 120, 30);
        btnLoad.setBackground(Color.BLACK);
        btnLoad.setForeground(Color.WHITE);
        contentPane.add(btnLoad);

        // Back Button
        JButton btnBack = new JButton("Back");
        btnBack.setBounds(240, 420, 120, 30);
        btnBack.setBackground(Color.BLACK);
        btnBack.setForeground(Color.WHITE);
        contentPane.add(btnBack);

        // Right side image
        ImageIcon i1 = new ImageIcon(ClassLoader.getSystemResource("icons/eight.jpg"));
        Image i2 = i1.getImage().getScaledInstance(600, 600, Image.SCALE_SMOOTH);
        JLabel imgLabel = new JLabel(new ImageIcon(i2));
        imgLabel.setBounds(500, 0, 600, 600);
        contentPane.add(imgLabel);

        // Action: Load data from DB
        btnLoad.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                try {
                    conn c = new conn();
                    String query = "SELECT * FROM room";
                    ResultSet rs = c.s.executeQuery(query);
                    table.setModel(DbUtils.resultSetToTableModel(rs));
                } catch (Exception ex) {
                    ex.printStackTrace();
                    JOptionPane.showMessageDialog(null, "Failed to load data.");
                }
            }
        });

        // Action: Go back to Reception
        btnBack.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                new Reception().setVisible(true);
                setVisible(false);
            } 
        });

        setVisible(true);
    }

    public static void main(String[] args) {
        new Room();
    }
}
