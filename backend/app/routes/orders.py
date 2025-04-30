

from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required
from app import mysql

orders_bp = Blueprint('orders', __name__)

@orders_bp.route('/api/orders', methods=['GET'])
@jwt_required()
def get_orders():
    cur = mysql.connection.cursor()
    cur.execute("SELECT id, customer_name, total_price, status FROM orders")
    rows = cur.fetchall()
    cur.close()
    orders = [{
        'id': row[0], 'customer_name': row[1], 'total_price': float(row[2]), 'status': row[3]
    } for row in rows]
    return jsonify(orders)