CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    balance NUMERIC(10, 2) NOT NULL DEFAULT 0
);

CREATE TABLE history (
    user_id INTEGER REFERENCES users(id),
    action VARCHAR(10),
    amount NUMERIC(10, 2),
    ts TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE OR REPLACE FUNCTION update_user_balance()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.action = 'debit' THEN
        UPDATE users SET balance = balance - NEW.amount WHERE id = NEW.user_id;
    ELSIF NEW.action = 'credit' THEN
        UPDATE users SET balance = balance + NEW.amount WHERE id = NEW.user_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_balance_trigger
AFTER INSERT ON history
FOR EACH ROW
EXECUTE PROCEDURE update_user_balance();


INSERT INTO users (id, balance) VALUES (1, 1000.00);

INSERT INTO history (user_id, action, amount)
VALUES (1, 'debit', 100.00);

INSERT INTO history (user_id, action, amount)
VALUES (1, 'credit', 50.00);
