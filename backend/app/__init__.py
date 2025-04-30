# app/__init__.py
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_mysqldb import MySQL


mysql = MySQL()  # ← Moved here

def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')

    CORS(app)
    JWTManager(app)
    mysql.init_app(app)  # ← Init happens here

    from .routes.products import products_bp
    app.register_blueprint(products_bp)
    
    from .routes.orders import orders_bp
    app.register_blueprint(orders_bp)

    from .routes.stats import stats_bp
    app.register_blueprint(stats_bp)

    from .routes.auth import auth_bp
    app.register_blueprint(auth_bp)



    return app


