#!/bin/bash
set -xe
mkdir -p /etc/nginx/certs
cp /var/app/staging/.platform/nginx/certs/* /etc/nginx/certs/
chown root:root /etc/nginx/certs/*
chmod 600 /etc/nginx/certs/*
cp /var/app/staging/.platform/nginx/conf.d/* /etc/nginx/conf.d/
nginx -t
systemctl restart nginx