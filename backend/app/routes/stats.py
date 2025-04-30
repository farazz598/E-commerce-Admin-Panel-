

from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required
from app import mysql

stats_bp = Blueprint('stats', __name__)

@stats_bp.route('/api/stats', methods=['GET'])
@jwt_required()
def get_stats():
    cur = mysql.connection.cursor()
    cur.execute("SELECT COUNT(*) FROM products")
    total_products = cur.fetchone()[0]
    cur.execute("SELECT COUNT(*) FROM orders")
    total_orders = cur.fetchone()[0]
    cur.close()
    return jsonify({ 'total_products': total_products, 'total_orders': total_orders })
