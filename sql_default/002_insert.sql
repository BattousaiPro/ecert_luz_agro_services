
-- SELECT * from PERMISOS order by code;
-- TRUNCATE TABLE PERMISOS;

INSERT INTO PERMISOS
(name, descrip, code, estado)
VALUES
('Leer Comunas', 'descripción', 'LUZ_AGRO_COMUNA_READ', true),
('Crear Comunas', 'descripción', 'LUZ_AGRO_COMUNA_CREATE', true),
('Eliminar Comunas', 'descripción', 'LUZ_AGRO_COMUNA_DELETE', true),
('Editar Comunas', 'descripción', 'LUZ_AGRO_COMUNA_EDIT', true),

('Leer Permisos', 'descripción', 'LUZ_AGRO_PERMISO_READ', true),
('Crear Permisos', 'descripción', 'LUZ_AGRO_PERMISO_CREATE', true),
('Eliminar Permisos', 'descripción', 'LUZ_AGRO_PERMISO_DELETE', true),
('Editar Permisos', 'descripción', 'LUZ_AGRO_PERMISO_EDIT', true),

('Leer Roles', 'descripción', 'LUZ_AGRO_ROL_READ', true),
('Crear Roles', 'descripción', 'LUZ_AGRO_ROL_CREATE', true),
('Eliminar Roles', 'descripción', 'LUZ_AGRO_ROL_DELETE', true),
('Editar Roles', 'descripción', 'LUZ_AGRO_ROL_EDIT', true),
('Agregar Permisos a Roles', 'descripción', 'LUZ_AGRO_ROL_ADD_PERMISO', true),

('Leer Sector', 'descripción', 'LUZ_AGRO_SECTOR_READ', true),
('Crear Sector', 'descripción', 'LUZ_AGRO_SECTOR_CREATE', true),
('Eliminar Sector', 'descripción', 'LUZ_AGRO_SECTOR_DELETE', true),
('Editar Sector', 'descripción', 'LUZ_AGRO_SECTOR_EDIT', true),

('Leer Usuarios', 'descripción', 'LUZ_AGRO_USER_READ', true),
('Crear Usuarios', 'descripción', 'LUZ_AGRO_USER_CREATE', true),
('Eliminar Usuarios', 'descripción', 'LUZ_AGRO_USER_DELETE', true),
('Editar Usuarios', 'descripción', 'LUZ_AGRO_USER_EDIT', true),
('Agregar Roles a los Usuarios', 'descripción', 'LUZ_AGRO_USER_ADD_ROL', true),

('Leer Socio', 'descripción', 'LUZ_AGRO_SOCIO_READ', true),
('Crear Socio', 'descripción', 'LUZ_AGRO_SOCIO_CREATE', true),
('Eliminar Socio', 'descripción', 'LUZ_AGRO_SOCIO_DELETE', true),
('Editar Socio', 'descripción', 'LUZ_AGRO_SOCIO_EDIT', true),
('Obtener Certicado Socio', 'descripción', 'LUZ_AGRO_SOCIO_CERTIFICADO', true),
('Obtener Certicado Socio', 'descripción', 'LUZ_AGRO_SOCIO_SELECCIONAR', true)
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
INSERT INTO ROL_PERMISO
(rol_id, permiso_id)
VALUES
(1, 1), (1, 2), (1, 3), (1, 4), (1, 5),
(1, 6), (1, 7), (1, 8), (1, 9), (1, 10),
(1, 11), (1, 12), (1, 13), (1, 14), (1, 15),
(1, 16), (1, 17), (1, 18), (1, 19), (1, 20),
(1, 21), (1, 22), (1, 23), (1, 24), (1, 25),
(1, 26), (1, 27), (1, 28)
;

INSERT INTO USUARIOS
(cta_username, cta_password, cta_email, estado)
VALUES
('adminCop', '$2a$10$F9NuYVFPJdCy6kfBkuPszuOSbeiyNU6yAu7pXwqWaFqRtiBXmZw6.', 'admin@admin.com', true)
;

INSERT INTO USER_ROL
(user_id, rol_id)
VALUES(1, 1)
;