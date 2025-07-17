# Contributing to [SplitIT]

Thank you for considering contributing to our Django project! We appreciate your help in making this project better. Please follow the guidelines below to ensure a smooth contribution process.

## How to Contribute

1. **Fork the Repository**

   - Click the "Fork" button at the top right of this repository to create your own copy.

2. **Clone Your Fork**

   - Clone your forked repository to your local machine:
     ```bash
     git clone https://github.com/your-username/your-repo-name.git
     ```

3. **Create a Branch**

   - Create a new branch for your feature or bug fix:
     ```bash
     git checkout -b your-branch-name
     ```

4. **Set Up the Virtual Environment**

   - Navigate to your project directory:
     ```bash
     cd your-repo-name
     ```
   - Create a virtual environment (using `venv`):
     ```bash
     python -m venv venv
     ```
   - Activate the virtual environment:
     - On Windows:
       ```bash
       venv\Scripts\activate
       ```
     - On macOS/Linux:
       ```bash
       source venv/bin/activate
       ```
   - Install the required packages:
     ```bash
     pip install -r requirements.txt
     ```

5. **Make Your Changes**

   - Make the necessary changes to the codebase. Be sure to follow our coding conventions and best practices.

6. **Launch webapp**

   - Before submitting your pull request, launch and check  to ensure everything works as expected:
     ```bash
     python manage.py runserver
     ```

7. **Commit Your Changes**

   - Commit your changes with a clear message:
     ```bash
     git add .
     git commit -m "Your descriptive commit message"
     ```

8. **Push Your Changes**

   - Push your changes to your forked repository:
     ```bash
     git push origin your-branch-name
     ```

9. **Create a Pull Request**
   - Go to the "Pull requests" tab in the original repository.
   - Click "New pull request."
   - Select your branch and submit the pull request. Provide a detailed description of your changes.

## Contribution Guidelines

- **Code Style**: Follow the PEP 8 style guide for Python code.
- **Commit Messages**: Use clear and descriptive commit messages.
- **Documentation**: If you add new features, please update the documentation accordingly.
- **Issues**: Before creating a pull request, please check for existing issues or discussions related to your contribution.

## Thank You!

We appreciate your contributions to our project. If you have any questions or need assistance, feel free to open an issue or reach out!

Happy coding!
