CREATE TABLE EMPRESA (
    emp_id INT PRIMARY KEY AUTO_INCREMENT,
    emp_nome VARCHAR(100) NOT NULL,
    emp_cnpj VARCHAR(18) NOT NULL,
    emp_cel VARCHAR(11),
    emp_end VARCHAR(255)
);

CREATE TABLE CONTATO (
    cont_id INT PRIMARY KEY AUTO_INCREMENT,
    emp_id INT,
    cont_tipo VARCHAR(50),
    cont_desc VARCHAR(128),
    FOREIGN KEY (emp_id) REFERENCES EMPRESA(emp_id)
);

CREATE TABLE CATEGORIA (
    cat_id INT PRIMARY KEY AUTO_INCREMENT,
    cat_nome VARCHAR(100),
    cat_desc VARCHAR(255)
);

CREATE TABLE PRODUTOS (
    prod_id INT PRIMARY KEY AUTO_INCREMENT,
    emp_id INT,
    cat_id INT,
    prod_nome VARCHAR(100),
    prod_desc TEXT,
    prod_est INT,
    prod_preco DECIMAL(10,2),
    FOREIGN KEY (emp_id) REFERENCES EMPRESA(emp_id),
    FOREIGN KEY (cat_id) REFERENCES CATEGORIA(cat_id)
);

CREATE TABLE USUARIOS (
    usu_id INT PRIMARY KEY AUTO_INCREMENT,
    emp_id INT,
    usu_nome VARCHAR(60),
    usu_email VARCHAR(80),
    usu_senha VARCHAR(255),
    FOREIGN KEY (emp_id) REFERENCES EMPRESA(emp_id)
);

CREATE TABLE CLIENTE (
    cli_id INT PRIMARY KEY AUTO_INCREMENT,
    emp_id INT,
    cli_nome VARCHAR(60),
    cli_email VARCHAR(80),
    cli_cel VARCHAR(11),
    cli_end VARCHAR(255),
    FOREIGN KEY (emp_id) REFERENCES EMPRESA(emp_id)
);

CREATE TABLE ROTAS (
    rot_id INT PRIMARY KEY AUTO_INCREMENT,
    cli_id INT,
    rot_des VARCHAR(255),
    rot_dist DECIMAL(6,2),
    rot_data DATE,
    FOREIGN KEY (cli_id) REFERENCES CLIENTE(cli_id)
);

CREATE TABLE PEDIDO (
    ped_id INT PRIMARY KEY AUTO_INCREMENT,
    cli_id INT,
    ped_data DATE,
    ped_status VARCHAR(20),
    ped_valor_total DECIMAL(6,2),
    FOREIGN KEY (cli_id) REFERENCES CLIENTE(cli_id)
);

CREATE TABLE MENSAGEM (
    mens_id INT PRIMARY KEY AUTO_INCREMENT,
    ped_id INT,
    mens_data_envio INT,
    mens_status VARCHAR(20),
    FOREIGN KEY (ped_id) REFERENCES PEDIDO(ped_id)
);

CREATE TABLE PEDIDO_PRODUTO (
    pedpro_id INT PRIMARY KEY AUTO_INCREMENT,
    prod_id INT,
    ped_id INT,
    pedpro_preco_unit DECIMAL(6,2),
    pedpro_quant DECIMAL(6,2),
    FOREIGN KEY (prod_id) REFERENCES PRODUTOS(prod_id),
    FOREIGN KEY (ped_id) REFERENCES PEDIDO(ped_id)
);

CREATE TABLE PAGAMENTO (
    pag_id INT PRIMARY KEY AUTO_INCREMENT,
    ped_id INT,
    pag_metodo VARCHAR(30),
    pag_data DATE,
    pag_status VARCHAR(20),
    FOREIGN KEY (ped_id) REFERENCES PEDIDO(ped_id)
);
