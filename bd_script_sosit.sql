CREATE DATABASE sosit;

USE sosit;

CREATE TABLE usuario (
	id_usuario INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(255) NOT NULL,
    tipo VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    
    id_contato INT,
    id_endereco INT,
    id_informacoes_empresa INT,
    id_dados_bancarios INT,
    
    FOREIGN KEY (id_contato) REFERENCES contato (id_contato),
    FOREIGN KEY (id_endereco) REFERENCES endereco (id_endereco),
    FOREIGN KEY (id_informacoes_empresa) REFERENCES informacoes_empresa (id_informacoes_empresa),
    FOREIGN KEY (id_dados_bancarios) REFERENCES dados_bancarios (id_dados_bancarios)
);

DROP TABLE contato;
CREATE TABLE contato (
	id_contato INT PRIMARY KEY AUTO_INCREMENT,
    email_contato VARCHAR(255),
    telefone VARCHAR(255),
    nome_contato VARCHAR(255)
);

DROP TABLE endereco;
CREATE TABLE endereco (
	id_endereco INT PRIMARY KEY AUTO_INCREMENT,
    cep VARCHAR(255),
    rua VARCHAR(255),
    num VARCHAR(255),
    cidade VARCHAR(255),
    estado VARCHAR(255)
);

DROP TABLE informacoes_empresa;
CREATE TABLE informacoes_empresa (
	id_informacoes_empresa INT PRIMARY KEY AUTO_INCREMENT,
    cnpj VARCHAR(255),
    descricao VARCHAR(255),
    link_site VARCHAR(255),
    img_perfil VARCHAR(255)
);

DROP TABLE dados_bancarios;
CREATE TABLE dados_bancarios (
	id_dados_bancarios INT PRIMARY KEY AUTO_INCREMENT,
    banco VARCHAR(255),
    agencia VARCHAR(255),
    digito VARCHAR(255),
    tipo_conta VARCHAR(255),
    conta VARCHAR(255)
);

DROP TABLE agenda;
CREATE TABLE agenda (
	id_agenda INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    nome VARCHAR(255),
    servico VARCHAR(255),
    descricao VARCHAR(255),
    
    horarios_seg JSON,
    horarios_ter JSON,
	horarios_qua JSON,
    horarios_qui JSON,
    horarios_sex JSON,
    horarios_sab JSON,
    horarios_dom JSON,
    
    FOREIGN KEY (id_usuario) REFERENCES usuario (id_usuario)
);

DROP TABLE compromisso;
CREATE TABLE compromisso (
	id_compromisso INT PRIMARY KEY AUTO_INCREMENT,
    id_agenda INT NOT NULL,
    id_usuario INT NOT NULL,
    data_completa DATE,
    horario TIME,
    
    FOREIGN KEY (id_agenda) REFERENCES agenda (id_agenda),
	FOREIGN KEY (id_usuario) REFERENCES usuario (id_usuario)
);