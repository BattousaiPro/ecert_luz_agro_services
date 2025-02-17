-- SELECT * from SECTOR;
-- DROP TABLE SECTOR;
-- TRUNCATE TABLE SECTOR;

CREATE TABLE SECTOR (
    codigo int(11) NOT NULL,
    descrip varchar(150) NOT NULL,
    dia_car int(11) NULL,
    cod_cob int(11) NULL,
    estado tinyint(4) NOT NULL,
	CONSTRAINT SECTOR_pk PRIMARY KEY (codigo)
);

-- SELECT * from COMUNAS;
-- DROP TABLE COMUNAS;
-- TRUNCATE TABLE COMUNAS;

CREATE TABLE COMUNAS (
    codigo int(11) NOT NULL,
    descrip varchar(100) NOT NULL,
    estado tinyint(4) NOT NULL,
	CONSTRAINT COMUNAS_pk PRIMARY KEY (codigo)
);

-- SELECT * from USUARIOS;
-- DROP TABLE USUARIOS;
-- TRUNCATE TABLE USUARIOS;

CREATE TABLE USUARIOS (
    id int(11) NOT NULL AUTO_INCREMENT,
    cta_username varchar(150) NOT NULL,
    cta_password varchar(250) NOT NULL,
    cta_email varchar(250) NOT NULL,
    estado tinyint(4) NOT NULL,
    CONSTRAINT USUARIOS_pk PRIMARY KEY (id)
);

--
-- SELECT * from ROLES;
-- DROP TABLE ROLES;
-- TRUNCATE TABLE ROLES;

CREATE TABLE ROLES (
    id int(11) NOT NULL AUTO_INCREMENT,
    name varchar(50) NOT NULL,
    descrip varchar(250) NULL,
	code varchar(250) NOT NULL,
    estado tinyint(4) NOT NULL,
	CONSTRAINT ROLES_pk PRIMARY KEY (id)
);

--
-- SELECT * from PERMISOS;
-- DROP TABLE PERMISOS;
-- TRUNCATE TABLE PERMISOS;

CREATE TABLE PERMISOS (
	id int(11) NOT NULL AUTO_INCREMENT,
	name varchar(50) NOT NULL,
	descrip varchar(250) NULL,
	code varchar(250) NOT NULL,
    estado tinyint(4) NOT NULL,
CONSTRAINT PERMISOS_pk PRIMARY KEY (id)
);

-- SELECT * from USER_ROL;
-- DROP TABLE USER_ROL;

CREATE TABLE USER_ROL (
  user_id int(11) NOT NULL,
  rol_id int(11) NOT NULL,
  PRIMARY KEY (`user_id`,`rol_id`),
  KEY `IDX_USER_ROL_user_id` (`user_id`),
  KEY `IDX_USER_ROL_rol_id` (`rol_id`),
  CONSTRAINT fk_USER_ROL_USUARIOS FOREIGN KEY (user_id) REFERENCES USUARIOS(id) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT fk_USER_ROL_ROLES FOREIGN KEY (rol_id) REFERENCES ROLES(id) ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- SELECT * from ROL_PERMISO;
-- DROP TABLE ROL_PERMISO;

CREATE TABLE ROL_PERMISO (
  rol_id int(11) NOT NULL,
  permiso_id int(11) NOT NULL,
  PRIMARY KEY (`rol_id`, `permiso_id`),
  KEY `IDX_ROL_PERMISO_rol_id` (`rol_id`),
  KEY `IDX_ROL_PERMISO_permiso_id` (`permiso_id`),
  CONSTRAINT fk_ROL_PERMISO_ROLES FOREIGN KEY (rol_id) REFERENCES ROLES(id) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT fk_ROL_PERMISO_PERMISOS FOREIGN KEY (permiso_id) REFERENCES PERMISOS(id) ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- SELECT * from KAPMAE;
-- DROP TABLE KAPMAE;
-- TRUNCATE TABLE KAPMAE;

CREATE TABLE KAPMAE (
    rut_cop varchar(13),
    ape_pat varchar(20),
    ape_mat varchar(20),
    nombres varchar(20),
    cod_cop int(11) NOT NULL,
    cod_lli int(11),
    cod_ant int(11),
    cod_nvo int(11),
    cod_ori int(11),
    sec_cop int(11) NOT NULL,
    ano_inc int(11),
    mto_inc decimal(10,0),
    fec_inc date,
    ano_tra int(11),
    kap_tra decimal(12,0),
    fec_tra date,
    acc_tra decimal(10,0),
    acc_ret decimal(10,0),
    acc_apo decimal(10,0),
    fec_act date,
    est_tra varchar(1),
    est_bon int(11),
    dir_pos varchar(40),
    nro_te1 varchar(16) NULL,
    nro_te2 varchar(16) NULL,
    nro_te3 varchar(16) NULL,
    nro_te4 varchar(16) NULL,
    com_pos int(11) NOT NULL,
    obs_cap varchar(120),
    nro_sol int(11),
    fec_sol date,
    fec_apr date,
    fec_can date,
    est_sol varchar(3),
    sec_cte int(11),
    area int(11),
    sec_imp int(11),
    est_reg varchar(3),
    acc_con int(11),
    aju_acc int(11),
    PRIMARY KEY (`rut_cop`, `cod_cop`),
    KEY `IDX_KAPMAE_rut_cop` (`rut_cop`),
    KEY `IDX_KAPMAE_cod_cop` (`cod_cop`),
	CONSTRAINT fk_SECTOR FOREIGN KEY (sec_cop) REFERENCES SECTOR(codigo),
	CONSTRAINT fk_COMUNAS FOREIGN KEY (com_pos) REFERENCES COMUNAS(codigo)
);

los indices de 
    KEY `IDX_KAPMAE_rut_cop` (`rut_cop`),
    KEY `IDX_KAPMAE_cod_cop` (`cod_cop`),

    quedaron como laves unicas ..... pero no debe ser asi ................validar el script del
    agregar de manera explicia Nul a lo campos de todas la tablas.