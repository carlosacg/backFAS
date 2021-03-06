SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS users;
CREATE TABLE users(

	identification VARCHAR(100)  NOT NULL PRIMARY KEY,
	users_name VARCHAR(40) NOT NULL,
	last_name VARCHAR(20) NOT NULL,
	email VARCHAR(40),
	picture VARCHAR(100)

);

INSERT INTO users VALUES(1,'carlos','cuervo','carlos.cuervo@correounivalle.edu.co','nada');

DROP TABLE IF EXISTS account;
CREATE TABLE account(

	account_number INTEGER auto_increment NOT NULL PRIMARY KEY,
	type_account VARCHAR(20) NOT NULL,
	positive_balance INTEGER,
	negative_balance INTEGER,
	description VARCHAR(50),
	bank_name VARCHAR(20),
	identification VARCHAR(100) NOT NULL,
	CONSTRAINT account_fk FOREIGN KEY (identification) REFERENCES users(identification)
	
);
INSERT INTO account VALUES(DEFAULT,'DEBITO',0,0,'MECATO','BANCOLOMBIA',1);


DROP TABLE IF EXISTS budget;
CREATE TABLE budget(

	budget_number INTEGER auto_increment NOT NULL PRIMARY KEY,
	budget_name VARCHAR(20) NOT NULL,
	initial_date DATE NOT NULL,
	end_date DATE NOT NULL,
	identification VARCHAR(100) NOT NULL,
	CONSTRAINT budget_fk FOREIGN KEY (identification) REFERENCES users(identification)
	
);

INSERT INTO budget VALUES(DEFAULT,'UNIVERSIDAD','2018-10-15','2018-12-25',1);

DROP TABLE IF EXISTS item;
CREATE TABLE item(
	item_number INTEGER auto_increment NOT NULL PRIMARY KEY,
	budget_number INTEGER ,
	planned_balance INTEGER NOT NULL,
	spent_balance INTEGER,
	description VARCHAR(100),
	CONSTRAINT spent_fk1 FOREIGN KEY (budget_number) REFERENCES budget(budget_number) ON DELETE CASCADE

);

INSERT INTO item VALUES(DEFAULT,1,25000,0,'IMPREVISTOS');
INSERT INTO item VALUES(DEFAULT,NULL,0,0,'Ingresos Nomina');

DROP TABLE IF EXISTS transactions;
CREATE TABLE transactions(

	transaction_number INTEGER auto_increment NOT NULL PRIMARY KEY,
	item_number INTEGER NOT NULL,
	account_number INTEGER NOT NULL,
	spent_date DATE NOT NULL,
	spent_balance INTEGER NOT NULL,
	description VARCHAR(100) NOT NULL,
	CONSTRAINT transaction_fk1 FOREIGN KEY (account_number) REFERENCES account(account_number) ON DELETE CASCADE,
	CONSTRAINT transaction_fk3 FOREIGN KEY (item_number) REFERENCES item(item_number) ON DELETE CASCADE	
);



DROP TRIGGER IF EXISTS trigger_accounts;

DELIMITER //
CREATE TRIGGER trigger_accounts AFTER INSERT ON transactions 
FOR EACH ROW 
BEGIN
UPDATE item SET spent_balance=NEW.spent_balance+spent_balance WHERE item_number=NEW.item_number;

	IF(SELECT positive_balance FROM account WHERE account_number=NEW.account_number)>=NEW.spent_balance THEN BEGIN
		UPDATE account SET positive_balance=positive_balance-NEW.spent_balance WHERE account_number=NEW.account_number;
END;
END IF;

	IF(SELECT positive_balance FROM account WHERE account_number=NEW.account_number)<0 THEN BEGIN
		UPDATE account SET negative_balance=negative_balance+NEW.spent_balance WHERE account_number=NEW.account_number;
END;
END IF;

	IF(SELECT positive_balance FROM account WHERE account_number=NEW.account_number)=0 THEN BEGIN
		UPDATE account SET negative_balance=negative_balance WHERE account_number=NEW.account_number;
		UPDATE account SET positive_balance=-1 WHERE account_number=NEW.account_number;
END;
END IF;

END //
DELIMITER ;



DROP TRIGGER IF EXISTS trigger_transactions_delete;

DELIMITER //
CREATE TRIGGER trigger_transactions_delete BEFORE DELETE ON transactions 
FOR EACH ROW 
BEGIN

IF(SELECT positive_balance FROM account WHERE account_number=OLD.account_number)>=OLD.spent_balance THEN BEGIN
UPDATE account SET positive_balance=positive_balance+OLD.spent_balance WHERE account_number=OLD.account_number;
END;
END IF;

IF(SELECT positive_balance FROM account WHERE account_number=OLD.account_number)<0 THEN BEGIN
UPDATE account SET negative_balance=negative_balance-OLD.spent_balance WHERE account_number=OLD.account_number;
END;
END IF;

IF(SELECT positive_balance FROM account WHERE account_number=OLD.account_number)=0 THEN BEGIN
UPDATE account SET negative_balance=negative_balance WHERE account_number=OLD.account_number;
UPDATE account SET positive_balance=-1 WHERE account_number=OLD.account_number;
END;
END IF;

END //
DELIMITER ;
