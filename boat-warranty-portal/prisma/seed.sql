INSERT INTO product_registry (serial_number, model_name, purchase_date, warranty_duration_months)
VALUES
  ('BOAT-DEMO-001', 'Airdopes 141', '2025-01-15T00:00:00Z', 12),
  ('BOAT-DEMO-002', 'Rockerz 450', '2024-06-10T00:00:00Z', 24),
  ('BOAT-DEMO-003', 'Stone 352', '2025-08-20T00:00:00Z', 12)
ON CONFLICT (serial_number) DO NOTHING;

INSERT INTO repair_history
  (repair_id, serial_number, repair_date, issue_description, service_center_code, created_by)
VALUES
  ('00000000-0000-0000-0000-000000000001', 'BOAT-DEMO-001', '2025-06-20T00:00:00Z', 'Left earbud not charging', 'SC-MUM-01', 'seed'),
  ('00000000-0000-0000-0000-000000000002', 'BOAT-DEMO-001', '2025-06-28T00:00:00Z', 'Charging case replaced', 'SC-MUM-01', 'seed'),
  ('00000000-0000-0000-0000-000000000003', 'BOAT-DEMO-002', '2025-02-12T00:00:00Z', 'Power button repaired', 'SC-DEL-02', 'seed')
ON CONFLICT (repair_id) DO NOTHING;
