#!/usr/bin/env bash
# exit on error
set -o errexit

echo "--- Installing dependencies ---"
pip install -r requirements.txt

echo "--- Collecting static files ---"
python manage.py collectstatic --noinput

echo "--- Running migrations ---"
python manage.py migrate

echo "--- Seeding/Syncing portfolio database ---"
python seed_portfolio.py

echo "--- Build completed successfully! ---"
