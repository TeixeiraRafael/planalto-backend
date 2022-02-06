--
-- PostgreSQL database dump
--

-- Dumped from database version 12.9 (Ubuntu 12.9-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.9

-- Started on 2022-02-05 23:46:31 UTC

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE transport;
--
-- TOC entry 3033 (class 1262 OID 16385)
-- Name: transport; Type: DATABASE; Schema: -; Owner: admin
--

CREATE DATABASE transport WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C.UTF-8' LC_CTYPE = 'C.UTF-8';


ALTER DATABASE transport OWNER TO admin;

\connect transport

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 209 (class 1259 OID 16566)
-- Name: buses; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.buses (
    id integer NOT NULL,
    plate character varying(10) NOT NULL,
    model character varying(500) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp without time zone
);


ALTER TABLE public.buses OWNER TO admin;

--
-- TOC entry 208 (class 1259 OID 16564)
-- Name: buses_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.buses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.buses_id_seq OWNER TO admin;

--
-- TOC entry 3034 (class 0 OID 0)
-- Dependencies: 208
-- Name: buses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.buses_id_seq OWNED BY public.buses.id;


--
-- TOC entry 207 (class 1259 OID 16553)
-- Name: cities; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.cities (
    id integer NOT NULL,
    name character varying(500),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp without time zone
);


ALTER TABLE public.cities OWNER TO admin;

--
-- TOC entry 206 (class 1259 OID 16551)
-- Name: cities_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.cities_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cities_id_seq OWNER TO admin;

--
-- TOC entry 3035 (class 0 OID 0)
-- Dependencies: 206
-- Name: cities_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.cities_id_seq OWNED BY public.cities.id;


--
-- TOC entry 215 (class 1259 OID 16622)
-- Name: reservations; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.reservations (
    id integer NOT NULL,
    user_id bigint,
    trip_id bigint,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp without time zone,
    seat_id bigint NOT NULL,
    transaction_id character varying(15),
    approved boolean
);


ALTER TABLE public.reservations OWNER TO admin;

--
-- TOC entry 214 (class 1259 OID 16620)
-- Name: reservations_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.reservations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.reservations_id_seq OWNER TO admin;

--
-- TOC entry 3036 (class 0 OID 0)
-- Dependencies: 214
-- Name: reservations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.reservations_id_seq OWNED BY public.reservations.id;


--
-- TOC entry 203 (class 1259 OID 16525)
-- Name: roles; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.roles (
    id integer NOT NULL,
    name character varying(500)
);


ALTER TABLE public.roles OWNER TO admin;

--
-- TOC entry 202 (class 1259 OID 16523)
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.roles_id_seq OWNER TO admin;

--
-- TOC entry 3037 (class 0 OID 0)
-- Dependencies: 202
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;


--
-- TOC entry 211 (class 1259 OID 16579)
-- Name: seats; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.seats (
    id integer NOT NULL,
    bus_id bigint,
    name character varying(500),
    description character varying(500),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp without time zone
);


ALTER TABLE public.seats OWNER TO admin;

--
-- TOC entry 210 (class 1259 OID 16577)
-- Name: seats_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.seats_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.seats_id_seq OWNER TO admin;

--
-- TOC entry 3038 (class 0 OID 0)
-- Dependencies: 210
-- Name: seats_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.seats_id_seq OWNED BY public.seats.id;


--
-- TOC entry 213 (class 1259 OID 16597)
-- Name: trips; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.trips (
    id integer NOT NULL,
    origin_id bigint,
    destination_id bigint,
    bus_id bigint,
    tripdate timestamp without time zone NOT NULL,
    price double precision,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp without time zone
);


ALTER TABLE public.trips OWNER TO admin;

--
-- TOC entry 212 (class 1259 OID 16595)
-- Name: trips_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.trips_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.trips_id_seq OWNER TO admin;

--
-- TOC entry 3039 (class 0 OID 0)
-- Dependencies: 212
-- Name: trips_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.trips_id_seq OWNED BY public.trips.id;


--
-- TOC entry 205 (class 1259 OID 16535)
-- Name: users; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.users (
    id integer NOT NULL,
    role_id bigint DEFAULT 1 NOT NULL,
    name character varying(500) NOT NULL,
    email character varying(500) NOT NULL,
    password character varying(500) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp without time zone,
    document character varying(100),
    birthdate date,
    phone_type bigint,
    phone character varying(20),
    addr_postal_code character varying(20),
    addr_street character varying(100),
    addr_number character varying(100),
    addr_additional_info character varying(100),
    neighbourhood character varying(100),
    city character varying(100),
    state character varying(100),
    enable_sms boolean DEFAULT true
);


ALTER TABLE public.users OWNER TO admin;

--
-- TOC entry 204 (class 1259 OID 16533)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO admin;

--
-- TOC entry 3040 (class 0 OID 0)
-- Dependencies: 204
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 2845 (class 2604 OID 16569)
-- Name: buses id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.buses ALTER COLUMN id SET DEFAULT nextval('public.buses_id_seq'::regclass);


--
-- TOC entry 2842 (class 2604 OID 16556)
-- Name: cities id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.cities ALTER COLUMN id SET DEFAULT nextval('public.cities_id_seq'::regclass);


--
-- TOC entry 2854 (class 2604 OID 16625)
-- Name: reservations id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.reservations ALTER COLUMN id SET DEFAULT nextval('public.reservations_id_seq'::regclass);


--
-- TOC entry 2836 (class 2604 OID 16528)
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- TOC entry 2848 (class 2604 OID 16582)
-- Name: seats id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.seats ALTER COLUMN id SET DEFAULT nextval('public.seats_id_seq'::regclass);


--
-- TOC entry 2851 (class 2604 OID 16600)
-- Name: trips id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.trips ALTER COLUMN id SET DEFAULT nextval('public.trips_id_seq'::regclass);


--
-- TOC entry 2837 (class 2604 OID 16538)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 3021 (class 0 OID 16566)
-- Dependencies: 209
-- Data for Name: buses; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.buses (id, plate, model, created_at, updated_at, deleted_at) VALUES (1, 'AAA-1234', 'random_model', '2021-11-06 00:33:44.389206', '2021-11-06 00:33:44.389206', NULL);
INSERT INTO public.buses (id, plate, model, created_at, updated_at, deleted_at) VALUES (3, 'BBB-5678', 'Example Model', '2021-11-06 01:17:34.963783', '2021-11-06 01:33:25.593', '2021-11-06 01:35:15.962');


--
-- TOC entry 3019 (class 0 OID 16553)
-- Dependencies: 207
-- Data for Name: cities; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.cities (id, name, created_at, updated_at, deleted_at) VALUES (6, 'Rio Grande', '2021-11-05 21:47:38.515149', '2021-11-05 21:47:38.515149', NULL);
INSERT INTO public.cities (id, name, created_at, updated_at, deleted_at) VALUES (5, 'Porto Alegre', '2021-11-05 21:47:27.089599', '2021-11-05 21:56:59.537', NULL);
INSERT INTO public.cities (id, name, created_at, updated_at, deleted_at) VALUES (7, 'Pelotas', '2021-11-05 22:01:15.553735', '2021-11-05 22:02:10.487', NULL);
INSERT INTO public.cities (id, name, created_at, updated_at, deleted_at) VALUES (8, 'São Paulo', '2021-11-05 22:02:22.428974', '2021-11-05 22:02:43.907', NULL);


--
-- TOC entry 3027 (class 0 OID 16622)
-- Dependencies: 215
-- Data for Name: reservations; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.reservations (id, user_id, trip_id, created_at, updated_at, deleted_at, seat_id, transaction_id, approved) VALUES (39, 18, 7, '2021-11-22 11:34:02.150919', '2021-11-22 11:34:02.150919', NULL, 7, '18329007214', false);


--
-- TOC entry 3015 (class 0 OID 16525)
-- Dependencies: 203
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.roles (id, name) VALUES (1, 'basic_user');
INSERT INTO public.roles (id, name) VALUES (2, 'manager_user');
INSERT INTO public.roles (id, name) VALUES (3, 'root_user');


--
-- TOC entry 3023 (class 0 OID 16579)
-- Dependencies: 211
-- Data for Name: seats; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.seats (id, bus_id, name, description, created_at, updated_at, deleted_at) VALUES (1, 1, 'A1', 'window', '2021-11-06 02:05:19.723128', '2021-11-06 02:24:16.318', NULL);
INSERT INTO public.seats (id, bus_id, name, description, created_at, updated_at, deleted_at) VALUES (4, 1, 'B1', 'corridor', '2021-11-06 02:24:31.413266', '2021-11-06 02:24:31.413266', '2021-11-06 02:27:17.23');
INSERT INTO public.seats (id, bus_id, name, description, created_at, updated_at, deleted_at) VALUES (7, 1, 'B2', 'window', '2021-11-06 15:32:32.129152', '2021-11-06 15:35:08.589', NULL);
INSERT INTO public.seats (id, bus_id, name, description, created_at, updated_at, deleted_at) VALUES (3, 1, 'A2', 'corridor', '2021-11-06 02:17:51.834014', '2021-11-07 19:34:48.247', NULL);


--
-- TOC entry 3025 (class 0 OID 16597)
-- Dependencies: 213
-- Data for Name: trips; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.trips (id, origin_id, destination_id, bus_id, tripdate, price, created_at, updated_at, deleted_at) VALUES (1, 5, 6, 1, '2021-11-06 02:05:19.723128', 0.1, '2021-11-07 21:08:39.505496', '2021-11-07 21:08:39.505496', NULL);
INSERT INTO public.trips (id, origin_id, destination_id, bus_id, tripdate, price, created_at, updated_at, deleted_at) VALUES (2, 5, 6, 1, '2021-11-07 02:05:19.723128', 0.1, '2021-11-07 21:35:09.25174', '2021-11-07 21:35:09.25174', NULL);
INSERT INTO public.trips (id, origin_id, destination_id, bus_id, tripdate, price, created_at, updated_at, deleted_at) VALUES (3, 5, 6, 1, '2021-11-08 02:05:19.723128', 0.1, '2021-11-07 21:35:12.737717', '2021-11-07 21:35:12.737717', NULL);
INSERT INTO public.trips (id, origin_id, destination_id, bus_id, tripdate, price, created_at, updated_at, deleted_at) VALUES (4, 5, 6, 1, '2021-11-09 02:05:19.723128', 0.1, '2021-11-07 21:35:15.84097', '2021-11-07 21:35:15.84097', NULL);
INSERT INTO public.trips (id, origin_id, destination_id, bus_id, tripdate, price, created_at, updated_at, deleted_at) VALUES (5, 5, 6, 1, '2021-11-10 02:05:19.723128', 0.1, '2021-11-07 21:35:19.366458', '2021-11-07 21:35:19.366458', NULL);
INSERT INTO public.trips (id, origin_id, destination_id, bus_id, tripdate, price, created_at, updated_at, deleted_at) VALUES (6, 7, 6, 1, '2021-11-10 02:05:19.723128', 0.1, '2021-11-07 23:01:07.363959', '2021-11-07 23:04:06.76', '2021-11-07 23:05:52.071');
INSERT INTO public.trips (id, origin_id, destination_id, bus_id, tripdate, price, created_at, updated_at, deleted_at) VALUES (7, 5, 6, 1, '2021-11-23 02:05:19.723128', 113.5, '2021-11-22 02:19:28.135757', '2021-11-22 02:19:28.135757', NULL);


--
-- TOC entry 3017 (class 0 OID 16535)
-- Dependencies: 205
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.users (id, role_id, name, email, password, created_at, updated_at, deleted_at, document, birthdate, phone_type, phone, addr_postal_code, addr_street, addr_number, addr_additional_info, neighbourhood, city, state, enable_sms) VALUES (18, 2, 'Rafael Teixeira', 'rafael@mail.com', '$2b$10$zFN66utPury2MCKx3dATLeHXB6W0lZ2/owbKMhugL.zQ/4jltMyqS', '2021-11-05 12:47:27.186219', '2021-11-05 19:52:15.035', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, true);
INSERT INTO public.users (id, role_id, name, email, password, created_at, updated_at, deleted_at, document, birthdate, phone_type, phone, addr_postal_code, addr_street, addr_number, addr_additional_info, neighbourhood, city, state, enable_sms) VALUES (22, 1, 'Teixeira Rafael', 'rafa@mail.com', '$2b$10$Yy6qNFnAFtqXK49t/kNyqubLgJMvSE4XkH7pXWLvQscOv06Mnz7Bm', '2021-11-15 22:10:42.800533', '2021-11-15 22:10:42.800533', NULL, '33333333333', NULL, 1, '53981495088', '90520080', 'Rua Luzitana', '801', 'Apto 403', 'Higienópolis', 'Porto Alegre', 'Rio Grande do Sul', false);
INSERT INTO public.users (id, role_id, name, email, password, created_at, updated_at, deleted_at, document, birthdate, phone_type, phone, addr_postal_code, addr_street, addr_number, addr_additional_info, neighbourhood, city, state, enable_sms) VALUES (23, 1, 'Carmen', 'carmen@mail.com', '$2b$10$yCQPG24avOZhVjUeHsXxPe/NP/YGb.VbvmnUMNLUkk5HGboarHnmq', '2021-11-21 23:42:33.489899', '2021-11-21 23:42:33.489899', NULL, '1090', NULL, 2, '54565656', '9890000', 'Rua X', '10', NULL, 'Xis', 'City', 'DF', true);
INSERT INTO public.users (id, role_id, name, email, password, created_at, updated_at, deleted_at, document, birthdate, phone_type, phone, addr_postal_code, addr_street, addr_number, addr_additional_info, neighbourhood, city, state, enable_sms) VALUES (24, 1, 'Carmen', 'teste@mail.com', '$2b$10$5j/LupVzXQYhufGkP2UkMemDyPp1VCq9tAgXdgw.KG7Tcvs9ebR.a', '2021-11-22 14:45:49.055803', '2021-11-22 14:45:49.055803', NULL, '1090555', NULL, NULL, '55555555', '959595', 'Rua', '10', 'Rua x', 'Bairro', 'Cidade', 'Estados', true);
INSERT INTO public.users (id, role_id, name, email, password, created_at, updated_at, deleted_at, document, birthdate, phone_type, phone, addr_postal_code, addr_street, addr_number, addr_additional_info, neighbourhood, city, state, enable_sms) VALUES (26, 1, 'Carmen Elisa', 'teste1@mail.com', '$2b$10$zc.d6F89L.8BdfdCyqlI8uNlh9eNcDg1oZl2y3EqCZ8NVCvb0C9pK', '2021-11-22 14:52:36.095394', '2021-11-22 14:52:36.095394', NULL, '109090', NULL, 1, '90909090', '0909090', 'RuA ', '1', NULL, 'Marinha', 'Rio Grande', 'RS', true);
INSERT INTO public.users (id, role_id, name, email, password, created_at, updated_at, deleted_at, document, birthdate, phone_type, phone, addr_postal_code, addr_street, addr_number, addr_additional_info, neighbourhood, city, state, enable_sms) VALUES (29, 1, 'Carme Elisa', 'email123@mail.com', '$2b$10$2tG385SvSDR68twOlxZPwekJAl7TlQf0.ge0QBZCv1OoLzNbNgP/2', '2021-11-22 15:01:11.776398', '2021-11-22 15:01:11.776398', NULL, '19090', NULL, 1, '55991815552', '989000000', 'Rua A', '10', NULL, 'Marinha', 'Rio Grande', 'RS', true);
INSERT INTO public.users (id, role_id, name, email, password, created_at, updated_at, deleted_at, document, birthdate, phone_type, phone, addr_postal_code, addr_street, addr_number, addr_additional_info, neighbourhood, city, state, enable_sms) VALUES (31, 1, 'Carmen Elisa', 'suporte@mail.com', '$2b$10$c3z2VH0Ezp43uyGz2zHn6e1rvk5EC4tIwBHm11WVnHMQ/NS651QyO', '2021-11-22 15:08:27.668939', '2021-11-22 15:08:27.668939', NULL, '109022', NULL, 1, '55991815552', '98900000', 'Rua A', '10', NULL, 'Marinha', 'Rio Grande', 'RS', true);
INSERT INTO public.users (id, role_id, name, email, password, created_at, updated_at, deleted_at, document, birthdate, phone_type, phone, addr_postal_code, addr_street, addr_number, addr_additional_info, neighbourhood, city, state, enable_sms) VALUES (19, 1, 'Rafael Teixeira', 'teixeira@mail.com', '$2b$10$sDYQGrt8HrsufCri.1D35eHgagQoWR2ZZGvN6BDjzJApA90pqpbK6', '2021-11-05 18:51:09.45146', '2021-11-05 19:51:52.197', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, true);


--
-- TOC entry 3041 (class 0 OID 0)
-- Dependencies: 208
-- Name: buses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.buses_id_seq', 3, true);


--
-- TOC entry 3042 (class 0 OID 0)
-- Dependencies: 206
-- Name: cities_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.cities_id_seq', 8, true);


--
-- TOC entry 3043 (class 0 OID 0)
-- Dependencies: 214
-- Name: reservations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.reservations_id_seq', 39, true);


--
-- TOC entry 3044 (class 0 OID 0)
-- Dependencies: 202
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.roles_id_seq', 3, true);


--
-- TOC entry 3045 (class 0 OID 0)
-- Dependencies: 210
-- Name: seats_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.seats_id_seq', 7, true);


--
-- TOC entry 3046 (class 0 OID 0)
-- Dependencies: 212
-- Name: trips_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.trips_id_seq', 7, true);


--
-- TOC entry 3047 (class 0 OID 0)
-- Dependencies: 204
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.users_id_seq', 32, true);


--
-- TOC entry 2870 (class 2606 OID 16576)
-- Name: buses buses_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.buses
    ADD CONSTRAINT buses_pkey PRIMARY KEY (id);


--
-- TOC entry 2866 (class 2606 OID 16563)
-- Name: cities cities_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.cities
    ADD CONSTRAINT cities_pkey PRIMARY KEY (id);


--
-- TOC entry 2868 (class 2606 OID 16678)
-- Name: cities constraint_name; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.cities
    ADD CONSTRAINT constraint_name UNIQUE (name);


--
-- TOC entry 2862 (class 2606 OID 16650)
-- Name: users email; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT email UNIQUE (email);


--
-- TOC entry 2858 (class 2606 OID 16532)
-- Name: roles name; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT name UNIQUE (name);


--
-- TOC entry 2880 (class 2606 OID 16629)
-- Name: reservations reservations_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.reservations
    ADD CONSTRAINT reservations_pkey PRIMARY KEY (id);


--
-- TOC entry 2860 (class 2606 OID 16530)
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- TOC entry 2874 (class 2606 OID 16589)
-- Name: seats seats_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.seats
    ADD CONSTRAINT seats_pkey PRIMARY KEY (id);


--
-- TOC entry 2878 (class 2606 OID 16604)
-- Name: trips trips_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.trips
    ADD CONSTRAINT trips_pkey PRIMARY KEY (id);


--
-- TOC entry 2876 (class 2606 OID 16697)
-- Name: seats unique_name; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.seats
    ADD CONSTRAINT unique_name UNIQUE (name);


--
-- TOC entry 2872 (class 2606 OID 16695)
-- Name: buses unique_plate; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.buses
    ADD CONSTRAINT unique_plate UNIQUE (plate);


--
-- TOC entry 2864 (class 2606 OID 16545)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 2882 (class 2606 OID 16590)
-- Name: seats fk_bus; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.seats
    ADD CONSTRAINT fk_bus FOREIGN KEY (bus_id) REFERENCES public.buses(id);


--
-- TOC entry 2884 (class 2606 OID 16610)
-- Name: trips fk_destination; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.trips
    ADD CONSTRAINT fk_destination FOREIGN KEY (destination_id) REFERENCES public.cities(id);


--
-- TOC entry 2883 (class 2606 OID 16605)
-- Name: trips fk_origin; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.trips
    ADD CONSTRAINT fk_origin FOREIGN KEY (origin_id) REFERENCES public.cities(id);


--
-- TOC entry 2881 (class 2606 OID 16546)
-- Name: users fk_role; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES public.roles(id);


--
-- TOC entry 2887 (class 2606 OID 16722)
-- Name: reservations fk_seat; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.reservations
    ADD CONSTRAINT fk_seat FOREIGN KEY (seat_id) REFERENCES public.seats(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- TOC entry 2886 (class 2606 OID 16635)
-- Name: reservations fk_trip; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.reservations
    ADD CONSTRAINT fk_trip FOREIGN KEY (trip_id) REFERENCES public.trips(id);


--
-- TOC entry 2885 (class 2606 OID 16630)
-- Name: reservations fk_user; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.reservations
    ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public.users(id);


-- Completed on 2022-02-05 23:46:54 UTC

--
-- PostgreSQL database dump complete
--

