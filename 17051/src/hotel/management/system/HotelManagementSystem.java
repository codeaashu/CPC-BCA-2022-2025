package hotel.management.system;

import java.awt.*;
import javax.swing.*;
import java.awt.event.*;

public class HotelManagementSystem extends JFrame implements ActionListener {

    JLabel backgroundLabel;
    JButton nextButton;

    public HotelManagementSystem() {
        // Get full screen size
        Dimension screenSize = Toolkit.getDefaultToolkit().getScreenSize();
        int width = screenSize.width;
        int height = screenSize.height;

        // Set full screen
        setSize(width, height);
        setLayout(null);
        setLocationRelativeTo(null); // center the frame

        // Load and scale image to full screen
        ImageIcon originalIcon = new ImageIcon(ClassLoader.getSystemResource("icons/firstone.jpg"));
        Image scaledImage = originalIcon.getImage().getScaledInstance(width, height, Image.SCALE_SMOOTH);
        ImageIcon fullScreenIcon = new ImageIcon(scaledImage);

        // Background label with image
        backgroundLabel = new JLabel(fullScreenIcon);
        backgroundLabel.setBounds(0, 0, width, height);
        backgroundLabel.setLayout(null);

        // Heading
        JLabel title = new JLabel("HOTEL MANAGEMENT SYSTEM");
        title.setBounds(30, height - 250, 1500, 100);
        title.setFont(new Font("serif", Font.PLAIN, 100));
        title.setForeground(Color.ORANGE);
        backgroundLabel.add(title);

        // Button
        nextButton = new JButton("Next");
        nextButton.setBounds(width - 200, height - 150, 150, 50);
        nextButton.setBackground(Color.WHITE);
        nextButton.setForeground(Color.BLACK);
        nextButton.addActionListener(this);
        backgroundLabel.add(nextButton);

        add(backgroundLabel);
        setDefaultCloseOperation(EXIT_ON_CLOSE);
        setVisible(true);

        // Blinking text using thread (still not recommended, but kept as per your logic)
        new Thread(() -> {
            while (true) {
                title.setVisible(false);
                try {
                    Thread.sleep(500);
                } catch (Exception e) {
                }
                title.setVisible(true);
                try {
                    Thread.sleep(500);
                } catch (Exception e) {
                }
            }
        }).start();
    }

    public void actionPerformed(ActionEvent ae) {
        new Login().setVisible(true);
        this.setVisible(false);
    }

    public static void main(String[] args) {
        new HotelManagementSystem();
    }
}
