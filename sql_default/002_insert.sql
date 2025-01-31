
-- SELECT * from PERMISOS order by code;
-- TRUNCATE TABLE PERMISOS;

INSERT INTO PERMISOS
(name, descrip, code, estado)
VALUES
('Ver menú Socio', 'descripción', 'LUZ_AGRO_MENU_SOCIO', true),
('Ver menú Ficha', 'descripción', 'LUZ_AGRO_MENU_FICHA', true),
('Ver menú Sector', 'descripción', 'LUZ_AGRO_MENU_SECTOR', true),
('Ver menú Comuna', 'descripción', 'LUZ_AGRO_MENU_COMUNA', true),
('Ver menú Usuario', 'descripción', 'LUZ_AGRO_MENU_USUARIO', true),
('Ver menú Rol', 'descripción', 'LUZ_AGRO_MENU_ROL', true),
('Ver menú Permiso', 'descripción', 'LUZ_AGRO_MENU_PERMISO', true),

('Crear Comunas', 'descripción', 'LUZ_AGRO_COMUNA_CREATE', true),
('Eliminar Comunas', 'descripción', 'LUZ_AGRO_COMUNA_DELETE', true),
('Editar Comunas', 'descripción', 'LUZ_AGRO_COMUNA_EDIT', true),

('Crear Permisos', 'descripción', 'LUZ_AGRO_PERMISO_CREATE', true),
('Eliminar Permisos', 'descripción', 'LUZ_AGRO_PERMISO_DELETE', true),
('Editar Permisos', 'descripción', 'LUZ_AGRO_PERMISO_EDIT', true),

('Crear Roles', 'descripción', 'LUZ_AGRO_ROL_CREATE', true),
('Eliminar Roles', 'descripción', 'LUZ_AGRO_ROL_DELETE', true),
('Editar Roles', 'descripción', 'LUZ_AGRO_ROL_EDIT', true),
('Agregar Permisos a Roles', 'descripción', 'LUZ_AGRO_ROL_ADD_PERMISO', true),

('Crear Sector', 'descripción', 'LUZ_AGRO_SECTOR_CREATE', true),
('Eliminar Sector', 'descripción', 'LUZ_AGRO_SECTOR_DELETE', true),
('Editar Sector', 'descripción', 'LUZ_AGRO_SECTOR_EDIT', true),

('Crear Usuarios', 'descripción', 'LUZ_AGRO_USER_CREATE', true),
('Eliminar Usuarios', 'descripción', 'LUZ_AGRO_USER_DELETE', true),
('Editar Usuarios', 'descripción', 'LUZ_AGRO_USER_EDIT', true),
('Agregar Roles a los Usuarios', 'descripción', 'LUZ_AGRO_USER_ADD_ROL', true),

('Crear Socio', 'descripción', 'LUZ_AGRO_SOCIO_CREATE', true),
('Eliminar Socio', 'descripción', 'LUZ_AGRO_SOCIO_DELETE', true),
('Editar Socio', 'descripción', 'LUZ_AGRO_SOCIO_EDIT', true),
('Obtener Certicado Socio', 'descripción', 'LUZ_AGRO_SOCIO_CERTIFICADO', true),
('Obtener Certicado Socio', 'descripción', 'LUZ_AGRO_SOCIO_SELECCIONAR', true),
('Buscar Imagenes pos Codigo de socio', 'descripción', 'LUZ_AGRO_SOCIO_BUSCAR_IMG_COD', true)
;


-- SELECT * from ROLES order by code;
-- TRUNCATE TABLE ROLES;

INSERT INTO ROLES
(name, descrip, code, estado)
VALUES
('TP', 'Todos los Permisos', '001', true),
('Ejecutivo', 'Actividades ejecutivas', '002', true),
('Cooperados', 'miembros e la coperativa', '003', true),
('Invitado', 'Personas fuera de la coperativa', '004', true)
;


-- Set All Permis to Rol "TP"
-- TRUNCATE TABLE ROL_PERMISO;
-- select * from ROL_PERMISO;
INSERT INTO ROL_PERMISO
(rol_id, permiso_id)
VALUES
(1, 1), (1, 2), (1, 3), (1, 4), (1, 5),
(1, 6), (1, 7), (1, 8), (1, 9), (1, 10),
(1, 11), (1, 12), (1, 13), (1, 14), (1, 15),
(1, 16), (1, 17), (1, 18), (1, 19), (1, 20),
(1, 21), (1, 22), (1, 23), (1, 24), (1, 25),
(1, 26), (1, 27), (1, 28), (1, 29)
;

INSERT INTO USUARIOS
(cta_username, cta_password, cta_email, estado)
VALUES
('adminCop', '$2a$10$F9NuYVFPJdCy6kfBkuPszuOSbeiyNU6yAu7pXwqWaFqRtiBXmZw6.', 'admin@admin.com', true)
;


-- TRUNCATE TABLE USER_ROL;
-- select * from USER_ROL;
INSERT INTO USER_ROL
(user_id, rol_id)
VALUES(1, 1)
;

-- SELECT * from COMUNAS;
-- DROP TABLE COMUNAS;
-- TRUNCATE TABLE COMUNAS;

INSERT INTO COMUNAS
(codigo, descrip, estado) VALUES 
(0, '', true),
(1, 'LINARES', true),
(2, 'YERBAS BUENAS', true),
(3, 'COLBUN', true),
(4, 'VILLA ALEGRE', true),
(5, 'SAN JAVIER', true),
(6, 'CONSTITUCION', true),
(7, 'LONGAVI', true),
(8, 'SANTIAGO', true),
(9, 'PANIMAVIDA', true),
(10, 'VARA GRUESA', true),
(11, 'TALCA', true),
(12, 'YERBAS BUENAS', true),
(13, 'LA CISTERNA', true),
(14, 'PROVIDENCIA', true),
(15, 'PUENTE ALTO', true),
(16, 'LA FLORIDA', true),
(17, 'SAN BERNARDO', true),
(18, 'MOLINA', true),
(19, 'CHILLAN', true),
(20, 'VINA DEL MAR', true),
(21, 'LA REINA', true),
(22, 'SAN FELIPE', true),
(23, 'LAS CONDES', true),
(24, 'CURICO', true),
(25, 'CONCEPCION', true),
(26, 'VITACURA', true),
(27, 'SAN MIGUEL', true),
(28, 'CHACARILLA', true),
(29, 'PARRAL', true),
(30, 'RANCAGUA', true),
(31, 'MACUL', true),
(32, 'DEL LAJA', true),
(33, 'LAJA', true),
(34, 'RETIRO', true),
(35, 'ANTOFAGASTA', true),
(36, 'VICTORIA', true),
(37, 'TALCAHUANO', true),
(38, 'RENCA', true),
(40, 'QUILPUE', true),
(41, 'CONCHALI', true),
(42, 'LA GRANJA', true),
(43, 'OLMUE', true),
(44, 'VALPARAISO', true),
(45, 'CHUQUICAMATA', true),
(48, 'PUNTA ARENAS', true),
(49, 'LONTUE', true),
(50, 'BUIN', true),
(51, 'LOS ANGELES', true),
(52, 'RENGO', true),
(53, 'IQUIQUE', true),
(54, 'PUERTO MONTT', true),
(55, 'CAUQUENES', true),
(56, 'OSORNO', true),
(59, 'SAN FERNANDO', true),
(70, 'SANTIAGO', true),
(80, 'LOS ANDES', true),
(90, 'COPIHUE', true),
(91, 'TEMUCO', true);
--

--
--

--
-- SELECT * from SECTOR;
-- DROP TABLE SECTOR;
-- TRUNCATE TABLE SECTOR;

-- 

INSERT INTO SECTOR
(codigo, descrip, dia_car, cod_cob, estado) VALUES
(0, '* SIN SECTOR *', 0, 20, true),
(1, 'LAS MOTAS', 0, 10, true),
(2, 'SAN ESTEBAN', 0, 10, true),
(3, 'LA PUNTILLA', 0, 10, true),
(4, 'POB. LAS ROSAS', 0, 10, true),
(5, 'SAN LUIS DE MIRAFLORES', 0, 10, true),
(6, 'SAN RAUL', 0, 10, true),
(7, 'LA CANA', 0, 10, true),
(8, 'MESAMAVIDA', 0, 10, true),
(9, 'LA PAILILLA', 0, 10, true),
(10, 'LA CUARTA LONGAVI', 0, 10, true),
(11, 'LOMAS DE POLCURA', 0, 10, true),
(12, 'COLONIA ROBERTO OPAZO', 0, 10, true),
(13, 'PUNTA DE MONTE', 0, 10, true),
(14, 'SAN JORGE - SAN RAUL', 0, 10, true),
(15, 'SAN RAUL - EL CASCAJO', 0, 10, true),
(16, 'MIRAFLORES', 0, 10, true),
(31, 'NO EXISTE', 0, 10, true),
(40, 'HUAPI ALTO', 0, 20, true),
(41, 'HUAPI BAJO', 0, 20, true),
(42, 'LAS ROSAS DEL HUAPI', 0, 10, true),
(43, 'SAN GABRIEL', 0, 10, true),
(44, 'RINCON DE ACHIBUENO', 0, 10, true),
(45, 'LA AGUADA', 0, 10, true),
(46, 'LLOLLINCO', 0, 10, true),
(47, 'HUIMEO', 0, 10, true),
(48, 'BODEGA', 0, 10, true),
(49, 'PASO CUNAO', 0, 10, true),
(50, 'RECREO', 0, 10, true),
(51, 'CERRILLOS', 12, 10, true),
(52, 'LIGUAY', 0, 10, true),
(53, 'CERRILLOS LIGUAY', 0, 10, true),
(54, 'RINCON DE ZUNIGA', 0, 10, true),
(55, 'LA GRANJA', 0, 10, true),
(56, 'MIRAFLORES CARRETERA', 0, 10, true),
(57, 'LOS CULENES', 0, 10, true),
(58, 'LONGAVI', 0, 10, true),
(59, 'PANAMERICANA SUR', 0, 10, true),
(60, 'LOS MARCOS', 0, 10, true),
(61, 'SALIDA A PALMILLA', 0, 10, true),
(62, 'CERRILLOS  -  4 ESQUINAS', 0, 10, true),
(63, 'SAN RAMON   -  HUIMEO', 0, 10, true),
(64, 'PUENTE ANCOA', 0, 10, true),
(65, 'PUENTE ACHIBUENO', 0, 10, true),
(66, 'EL CARMEN', 0, 10, true),
(80, 'MARIMAURA', 0, 10, true),
(81, 'MELOZAL SUR', 0, 10, true),
(82, 'MELOZAL NORTE', 0, 10, true),
(83, 'LAS TOSCAS', 0, 10, true),
(84, 'MELOZAL', 0, 10, true),
(85, 'CERRILLOS', 12, 20, true),
(86, 'MAJADILLA', 0, 10, true),
(87, 'SAN ANTONIO DE CALIBORO', 0, 10, true),
(88, 'CALIBORO', 12, 10, true),
(89, 'PILLAY', 12, 10, true),
(90, 'BARRANCA PILLAY', 12, 10, true),
(91, 'CARRIZAL SUR', 12, 10, true),
(92, 'PALHUA', 12, 10, true),
(93, 'CUEVA DE LEON', 0, 10, true),
(94, 'CARRIZAL NORTE', 12, 10, true),
(95, 'COMAVIDA', 12, 10, true),
(96, 'QUILQUILMO', 0, 10, true),
(97, 'LA GOTERA-MELOZAL', 0, 10, true),
(98, 'ARBOLILLO PILLAY', 0, 10, true),
(99, 'LA PUNTILLA PILLAY', 0, 10, true),
(100, 'AGUA BUENA', 0, 10, true),
(101, 'SAN JOSE DE CALIBORO', 0, 10, true),
(102, 'BODEGA 2', 0, 10, true),
(120, 'SAN ANTONIO', 0, 10, true),
(121, 'SAN ANTONIO LAMAS', 0, 10, true),
(122, 'SAN VICTOR ALAMOS', 0, 10, true),
(123, 'EL PINO DE LLANCANAO', 0, 10, true),
(124, 'LLANCANAO', 0, 20, true),
(125, 'LLEPO', 0, 10, true),
(126, 'EL PENASCO', 12, 20, true),
(127, 'VEGA ANCOA', 0, 10, true),
(128, 'EMBALSE ANCOA', 8, 10, true),
(129, 'VEGA DEL MOLINO', 0, 10, true),
(130, 'VEGA DE SALAS', 0, 10, true),
(131, 'PEJERREY', 0, 10, true),
(132, 'LOS MOGOTES', 0, 10, true),
(133, 'CAJON DE PEJERREY', 0, 10, true),
(134, 'EL CULMEN', 8, 10, true),
(135, 'ROBLERIA', 8, 10, true),
(136, 'CHUPALLAR', 8, 10, true),
(137, 'LOS HUALLES', 8, 10, true),
(138, 'SALIDA HUAPI', 0, 10, true),
(139, 'MONTECILLOS', 8, 10, true),
(140, 'PICHIRINCON', 0, 10, true),
(141, 'BALLICA SUR', 0, 10, true),
(142, 'BALLICA NORTE 2', 0, 10, true),
(143, 'SALIDA SAN ANTONIO', 0, 10, true),
(144, 'LA ISLA LLANCANAO 1', 0, 10, true),
(145, 'LLEPO CHICO', 0, 10, true),
(146, 'LINARES', 0, 10, true),
(147, 'RANCHILLO', 0, 10, true),
(148, 'LA ISLA LLANCANAO  2', 0, 10, true),
(160, 'MAITENES', 0, 20, true),
(161, 'CASA BLANCA', 0, 10, true),
(162, 'PILOCOYAN', 0, 10, true),
(163, 'LA HUIGUERA', 0, 10, true),
(164, 'EL ROSARIO', 0, 10, true),
(165, 'PALMILLA', 0, 10, true),
(166, 'PALMILLA ALTO Y BAJO', 0, 10, true),
(167, 'PUENTE SIFON', 0, 10, true),
(168, 'BATUCO', 0, 10, true),
(169, 'MAICA', 0, 10, true),
(170, 'EL EMBOQUE', 0, 10, true),
(171, 'LAS TOSCAS', 0, 10, true),
(172, 'LAS VEGAS LINARES', 0, 10, true),
(173, 'PANAMERICANA NORTE', 0, 10, true),
(174, 'MAICA BATUCO', 0, 10, true),
(175, 'POBLACION EL RENACER', 0, 10, true),
(176, 'REMOLINOS', 0, 10, true),
(200, 'SALIDA PANIMAVIDA', 0, 10, true),
(201, 'LA BALLICA NORTE 1', 0, 10, true),
(202, 'LA TORRE', 0, 10, true),
(203, 'LOS BATROS', 0, 10, true),
(204, 'QUINIPEUMO', 0, 10, true),
(205, 'EL PATO', 0, 10, true),
(206, 'EL TRANQUE', 0, 10, true),
(207, 'VARA GRUESA', 0, 10, true),
(208, 'POBLACION LOS AROMOS', 0, 10, true),
(209, 'SANTA MARIA', 0, 10, true),
(210, 'EL NANI', 0, 10, true),
(211, 'SAN ANTONIO ENCINA', 0, 10, true),
(212, 'EL CARMEN', 0, 10, true),
(213, 'EL YUGO', 0, 10, true),
(214, 'VILLORRIO MI CASA-VARA GRUESA', 0, 10, true),
(215, 'LOS PUQUIOS - LA POSADA', 0, 10, true),
(240, 'QUINTA LA LIBERTAD', 0, 20, true),
(241, 'LA POSADA', 0, 10, true),
(242, 'LAS VERTIENTES', 0, 10, true),
(243, 'LOS PUQUIOS', 0, 10, true),
(244, 'PUENTE ALTO', 0, 20, true),
(245, 'LAS ROSAS', 0, 10, true),
(246, 'LOS LAURELES', 0, 10, true),
(247, 'SAN BARTOLO', 0, 20, true),
(248, 'LAS CRUCES', 0, 10, true),
(249, 'COIRONAL', 0, 10, true),
(250, 'ENTRADA SUR DE Y.BUENAS 1', 0, 20, true),
(251, 'LAS ROSAS DE YERBAS BUENAS', 0, 10, true),
(252, 'LAS ROSAS', 0, 10, true),
(253, 'LA FAJA  1', 0, 10, true),
(254, 'CALLEJONES', 0, 10, true),
(255, 'EL REFUGIO', 0, 10, true),
(256, 'SALIDA YS BS', 0, 10, true),
(257, 'SANTA TERESA - PTE ALTO', 0, 10, true),
(258, 'PARQUE SAN MANUEL', 0, 10, true),
(259, 'PINADERO GRANDE', 0, 10, true),
(260, 'LA EMPRESA', 0, 10, true),
(261, 'AVDA. ANIBAL LEON BUSTOS', 0, 10, true),
(262, 'EL CARMEN - PANAMERICANA', 0, 10, true),
(263, 'CALLE CHORRILLOS', 0, 10, true),
(264, 'CALLE PRESIDENTE IBANEZ', 0, 10, true),
(280, 'CAPILLA PALACIO', 0, 10, true),
(281, 'LA UNION', 0, 10, true),
(282, 'EL PATO LA UNION', 0, 10, true),
(283, 'LOMAS DE PUTAGAN', 0, 10, true),
(284, 'RABONES', 0, 10, true),
(285, 'SAN FRANCISCO', 0, 10, true),
(286, 'QUINAMAVIDA', 21, 20, true),
(287, 'PASO RARI', 0, 10, true),
(288, 'EL ALAMO', 0, 10, true),
(289, 'ASENTAMIENTO SAN LUIS', 0, 10, true),
(290, 'LOS COLIHUES', 0, 10, true),
(320, 'YERBAS BUENAS ORIENTE', 0, 10, true),
(321, 'ABRANQUIL', 0, 10, true),
(322, 'LOS PAJARITOS', 0, 10, true),
(323, 'LA VICTORIA', 0, 10, true),
(324, 'SANTA GEMITA', 0, 10, true),
(325, 'LA FLOR DE PUIPUYEN', 0, 10, true),
(326, 'BAJO ESMERALDA', 0, 10, true),
(327, 'EL TORITO', 0, 10, true),
(328, 'EL VENCEDOR', 0, 10, true),
(329, 'CARACOLES 1', 0, 10, true),
(330, 'CARACOLES MEDIA MAQUINA', 0, 10, true),
(331, 'LA FLORESTA  1', 0, 10, true),
(332, 'SAN JOSE CHICO 1', 0, 10, true),
(333, 'EL SAUCE', 12, 10, true),
(334, 'LAS CABRAS', 0, 10, true),
(335, 'SAN JUAN 1', 0, 10, true),
(336, 'EL PENASCO DE SAN JUAN', 0, 10, true),
(337, 'SAN JUANITO 1', 0, 10, true),
(338, 'CAMINO OSCURO', 0, 10, true),
(339, 'POBLACION LA BRISA', 0, 10, true),
(340, 'CALLEJON LOS PUQUIOS', 0, 10, true),
(341, 'SAN JOSE CHICO 2', 0, 10, true),
(342, 'SAN JUAN 2', 0, 10, true),
(343, 'SAN JUANITO 2', 0, 10, true),
(344, 'STA ELENA-LLANO BLANCO', 0, 10, true),
(345, 'LA FLORESTA 2', 0, 10, true),
(360, 'GUMERA', 0, 10, true),
(361, 'LAS ROSAS DE TORNICURA', 0, 10, true),
(362, 'LLANO BLANCO', 0, 10, true),
(363, 'QUILIPIN', 0, 10, true),
(364, 'TRES ESQUINAS', 0, 10, true),
(365, 'SANTA ELENA', 0, 20, true),
(366, 'CHALLACURA  1', 0, 10, true),
(367, 'PERALILLO', 0, 10, true),
(368, 'ESPERANZA 1', 10, 10, true),
(369, 'CERRILLOS ESPERANZA', 0, 10, true),
(370, 'CALLEJON SN. JUAN DE DIOS', 0, 10, true),
(371, 'ESPERANZA 2', 10, 10, true),
(372, 'LA FAJA 2', 0, 10, true),
(373, 'ENTRADA SUR Y.BUENAS 2', 0, 10, true),
(374, 'YS.BUENAS NORTE', 0, 10, true),
(375, 'LISONJERA 2', 0, 10, true),
(400, 'LAS ROSAS OLEA', 0, 10, true),
(401, 'MONTE GRANDE', 10, 10, true),
(402, 'COIBUNGO', 10, 10, true),
(403, 'HUARACULEN', 0, 10, true),
(404, 'HUAIPILLO', 0, 10, true),
(405, 'LAGUNILLAS NORTE', 0, 10, true),
(406, 'LAGUNILLAS', 12, 10, true),
(407, 'PATAGUAS', 12, 10, true),
(408, 'PANGAL EL SAUCE 1', 0, 10, true),
(409, 'POLVAREDA', 12, 10, true),
(410, 'SANTA AMALIA', 12, 10, true),
(411, 'EL PENASCO', 12, 10, true),
(412, 'PANGAL CALLE LARGA 1', 0, 10, true),
(413, 'PANGAL 1', 12, 10, true),
(414, 'EL DURAZNO', 12, 10, true),
(415, 'EL SAUCE - LA GREDA', 0, 10, true),
(416, 'PANGAL EL SAUCE 2', 0, 10, true),
(417, 'PANGAL CALLE LARGA 2', 0, 10, true),
(418, 'PANGAL 2', 12, 10, true),
(419, 'POTRERO GRANDE', 0, 10, true),
(420, 'ESPERANZA 3', 10, 10, true),
(421, 'ESPERANZA 4', 10, 10, true),
(422, 'CALLE LARGA', 0, 10, true),
(423, 'CHALLACURA  2', 0, 10, true),
(440, 'SANTA BLANCA', 0, 10, true),
(441, 'SAN SEBASTIAN', 0, 20, true),
(442, 'SAN RAFAEL', 0, 10, true),
(443, 'SANTA ELENA', 0, 10, true),
(444, 'SANTA ROSA DE PANIMAVIDA', 0, 10, true),
(445, 'PANIMAVIDA', 21, 10, true),
(446, 'POBLACION ESFUERZO', 0, 10, true),
(447, 'SANTA ESTER', 0, 10, true),
(448, 'SAN NICOLAS', 0, 10, true),
(449, 'CONDOMINIO SANTA HELENA', 0, 10, true),
(450, 'VILLORRIO STA ELENA', 0, 10, true),
(480, 'SAN DIONISIO', 0, 10, true),
(481, 'SAN DIONISIO ALTO  1', 0, 10, true),
(482, 'POB. LOS AROMOS COLBUN', 0, 10, true),
(483, 'MILLAMALAL', 0, 10, true),
(484, 'HUASO CAMPESINO', 0, 10, true),
(485, 'COLBUN ORIENTE', 0, 10, true),
(486, 'COLBUN ALTO', 0, 10, true),
(487, 'LA PATAGUA', 0, 10, true),
(488, 'LA GUARDIA', 0, 10, true),
(489, 'CAMINO SAN JOSE', 0, 10, true),
(490, 'ASENT. MANUEL RODRIGUEZ', 0, 10, true),
(491, 'RINCON DE PATAGUAS', 0, 10, true),
(492, 'BAZAES ALTO', 0, 10, true),
(493, 'SAN GERONIMO', 0, 10, true),
(494, 'COLBUN', 0, 10, true),
(495, 'TRES ESQUINAS - LA GUARDIA', 0, 10, true),
(496, 'MILLAMALAL 1', 0, 10, true),
(497, 'LUCERO DE LA MANANA', 0, 10, true),
(498, 'LOS BOLDOS', 0, 10, true),
(499, 'SAN DIONISIO ALTO 2', 0, 10, true),
(500, 'PRETIL COLBUN ALTO', 0, 10, true),
(520, 'MAULE SUR', 23, 10, true),
(521, 'EL BOSQUE MAULE SUR 1', 0, 10, true),
(522, 'EL BOSQUE TRES PUENTES 1', 0, 10, true),
(523, 'LANCHA DE QUERI', 0, 10, true),
(524, 'ASENTAMIENTO QUERI', 0, 10, true),
(525, 'SANTA BERNARDITA', 0, 10, true),
(526, 'SANTA ANA DE QUERI', 23, 10, true),
(527, 'EL BOSQUE MAULE SUR 2', 0, 10, true),
(528, 'EL BOSQUE TRES MONTES 2', 0, 10, true),
(560, 'CARACOLES 2', 0, 10, true),
(561, 'SEMILLEROS 1', 21, 10, true),
(562, 'EL MANZANAL', 0, 10, true),
(563, 'LA LAGUNA', 0, 10, true),
(564, 'POBLACION ALBORADA', 0, 10, true),
(565, 'QUIRIQUINO', 0, 10, true),
(566, 'BAZAES BAJO', 0, 10, true),
(567, 'MAITENCILLO', 23, 10, true),
(568, 'SANTA MARIA DE ARQUEN', 0, 10, true),
(569, 'EL NARANJAL', 0, 10, true),
(570, 'POBLACION SANTA GEMITA', 0, 10, true),
(571, 'SEMILLEROS 2', 21, 10, true),
(572, 'SEMILLERO  2', 21, 10, true),
(600, 'LISONJERA 1', 0, 10, true),
(601, 'SAN CARLOS DE ARQUEN', 0, 10, true),
(602, 'LO CASTILLO', 0, 10, true),
(603, 'PENUELAS', 0, 10, true),
(604, 'ASENT. LAGUNILLAS DE ARQUEN', 0, 10, true),
(605, 'PERALES', 0, 10, true),
(606, 'SANTA NATALIA', 10, 10, true),
(607, 'FLOR DE MAULE 1', 0, 10, true),
(608, 'GABRIELA MISTRAL', 10, 10, true),
(609, 'SANTA CECILIA', 10, 10, true),
(610, 'CABRERIA', 10, 10, true),
(611, 'SAN MANUEL', 12, 10, true),
(612, 'EL OLIVAR COLMENAR', 0, 10, true),
(613, 'SANTA MARTA', 0, 10, true),
(614, 'FLOR DE MAULE 2', 0, 10, true),
(640, 'MELOCURA', 0, 10, true),
(641, 'ALQUIHUE', 12, 10, true),
(642, 'SAN BALDOMERO', 12, 10, true),
(643, 'EL MORRO', 0, 10, true),
(644, 'LOS MAQUIS', 0, 10, true),
(645, 'SANTA ANA DE LOBOS', 0, 10, true),
(646, 'SANTA MARIA DE MINGRE', 0, 10, true),
(647, 'LAS BRISAS LONCOMILLA', 0, 10, true),
(648, 'VAQUERIA', 0, 10, true),
(649, 'PEUMAL', 12, 10, true),
(650, 'LA ALDEA DE BOTACURA', 0, 10, true),
(680, 'CONSTITUCION', 0, 10, true),
(681, 'CRUCE EMPEDRADO', 0, 10, true),
(682, 'PURAPEL', 0, 10, true),
(720, 'LAS CANAS', 31, 10, true),
(721, 'PELLINES', 31, 10, true),
(722, 'COSTA BLANCA', 31, 10, true),
(723, 'MARHUECO', 31, 10, true),
(724, 'LA BOQUILLA', 31, 10, true),
(725, 'PAPIRUA', 31, 10, true),
(726, 'VINALES', 0, 10, true),
(727, 'EL LITRE', 0, 10, true),
(728, 'QUEBRADA HONDA', 0, 10, true),
(729, 'SAN PEDRO LAGUNILLAS', 0, 10, true);
