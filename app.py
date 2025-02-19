from flask import Flask, render_template, request, redirect, url_for, session, flash
import os

app = Flask(__name__)

# Secret key for session management
app.secret_key = os.urandom(24)

# Dummy users dictionary for testing
users = {
    'testuser': 'password123',
    'zoya': 'Zoya123'
}

# Home Page
@app.route('/')
def home():
    username = session.get('username')
    return render_template('main.html', username=username)

# Login Page
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        # Check if username exists and password matches
        if username in users and users[username] == password:
            session['username'] = username  # Store username in session
            flash('Login successful!', 'success')
            return redirect(url_for('home'))
        else:
            flash('Invalid username or password', 'error')

    return render_template('login.html')

# Logout
@app.route('/logout')
def logout():
    session.pop('username', None)
    flash('You have been logged out', 'success')
    return redirect(url_for('home'))

if __name__ == '__main__':
    app.run(debug=True)