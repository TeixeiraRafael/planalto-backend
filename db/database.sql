--
-- PostgreSQL database dump
--

-- Dumped from database version 14.1 (Debian 14.1-1.pgdg110+1)
-- Dumped by pg_dump version 14.1

-- Started on 2022-02-21 23:43:09 UTC

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

DROP DATABASE transport_ng;
--
-- TOC entry 3425 (class 1262 OID 33196)
-- Name: transport_ng; Type: DATABASE; Schema: -; Owner: admin
--

CREATE DATABASE transport_ng WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.utf8';


ALTER DATABASE transport_ng OWNER TO admin;

\connect transport_ng

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
-- TOC entry 212 (class 1259 OID 41389)
-- Name: buses; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.buses (
    id bigint NOT NULL,
    plate character varying(10) NOT NULL,
    model character varying(500) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp without time zone
);


ALTER TABLE public.buses OWNER TO admin;

--
-- TOC entry 211 (class 1259 OID 41388)
-- Name: buses_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.buses_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.buses_id_seq OWNER TO admin;

--
-- TOC entry 3426 (class 0 OID 0)
-- Dependencies: 211
-- Name: buses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.buses_id_seq OWNED BY public.buses.id;


--
-- TOC entry 218 (class 1259 OID 41434)
-- Name: cities; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.cities (
    id bigint NOT NULL,
    name character varying(500) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp without time zone
);


ALTER TABLE public.cities OWNER TO admin;

--
-- TOC entry 217 (class 1259 OID 41433)
-- Name: cities_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.cities_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cities_id_seq OWNER TO admin;

--
-- TOC entry 3427 (class 0 OID 0)
-- Dependencies: 217
-- Name: cities_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.cities_id_seq OWNED BY public.cities.id;


--
-- TOC entry 224 (class 1259 OID 41483)
-- Name: reservations; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.reservations (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    seat_id bigint NOT NULL,
    transaction_id character varying(15),
    approved boolean DEFAULT false NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    update_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp without time zone
);


ALTER TABLE public.reservations OWNER TO admin;

--
-- TOC entry 223 (class 1259 OID 41482)
-- Name: reservations_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.reservations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.reservations_id_seq OWNER TO admin;

--
-- TOC entry 3428 (class 0 OID 0)
-- Dependencies: 223
-- Name: reservations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.reservations_id_seq OWNED BY public.reservations.id;


--
-- TOC entry 214 (class 1259 OID 41400)
-- Name: roles; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.roles (
    id bigint NOT NULL,
    name character varying(500)
);


ALTER TABLE public.roles OWNER TO admin;

--
-- TOC entry 213 (class 1259 OID 41399)
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.roles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.roles_id_seq OWNER TO admin;

--
-- TOC entry 3429 (class 0 OID 0)
-- Dependencies: 213
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;


--
-- TOC entry 216 (class 1259 OID 41418)
-- Name: seats; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.seats (
    id bigint NOT NULL,
    bus_id bigint NOT NULL,
    name character varying(500) NOT NULL,
    description character varying(500) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp without time zone
);


ALTER TABLE public.seats OWNER TO admin;

--
-- TOC entry 215 (class 1259 OID 41417)
-- Name: seats_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.seats_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.seats_id_seq OWNER TO admin;

--
-- TOC entry 3430 (class 0 OID 0)
-- Dependencies: 215
-- Name: seats_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.seats_id_seq OWNED BY public.seats.id;


--
-- TOC entry 222 (class 1259 OID 41459)
-- Name: trip_legs; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.trip_legs (
    id bigint NOT NULL,
    trip_id bigint NOT NULL,
    origin_id bigint NOT NULL,
    destination_id bigint NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp without time zone
);


ALTER TABLE public.trip_legs OWNER TO admin;

--
-- TOC entry 221 (class 1259 OID 41458)
-- Name: trip_legs_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.trip_legs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.trip_legs_id_seq OWNER TO admin;

--
-- TOC entry 3431 (class 0 OID 0)
-- Dependencies: 221
-- Name: trip_legs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.trip_legs_id_seq OWNED BY public.trip_legs.id;


--
-- TOC entry 226 (class 1259 OID 41503)
-- Name: trip_legs_reservations; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.trip_legs_reservations (
    id bigint NOT NULL,
    trip_leg_id bigint NOT NULL,
    reservation_id bigint NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    update_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp without time zone
);


ALTER TABLE public.trip_legs_reservations OWNER TO admin;

--
-- TOC entry 225 (class 1259 OID 41502)
-- Name: trip_legs_reservations_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.trip_legs_reservations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.trip_legs_reservations_id_seq OWNER TO admin;

--
-- TOC entry 3432 (class 0 OID 0)
-- Dependencies: 225
-- Name: trip_legs_reservations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.trip_legs_reservations_id_seq OWNED BY public.trip_legs_reservations.id;


--
-- TOC entry 220 (class 1259 OID 41445)
-- Name: trips; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.trips (
    id bigint NOT NULL,
    price double precision NOT NULL,
    tripdate timestamp without time zone,
    bus_id bigint,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp without time zone
);


ALTER TABLE public.trips OWNER TO admin;

--
-- TOC entry 219 (class 1259 OID 41444)
-- Name: trips_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.trips_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.trips_id_seq OWNER TO admin;

--
-- TOC entry 3433 (class 0 OID 0)
-- Dependencies: 219
-- Name: trips_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.trips_id_seq OWNED BY public.trips.id;


--
-- TOC entry 210 (class 1259 OID 33220)
-- Name: users; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    role_id bigint,
    name character varying(500) NOT NULL,
    email character varying(500) NOT NULL,
    password character varying(500) NOT NULL,
    document character varying(100),
    birthdate date,
    phone_type bigint,
    phone character varying(20),
    addr_postal_code character varying(20),
    addr_street character varying(100),
    addr_number character varying(100),
    addr_additional_info character varying(100),
    neighbourhood character varying(100),
    city character varying,
    state character varying,
    enable_sms boolean,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp without time zone
);


ALTER TABLE public.users OWNER TO admin;

--
-- TOC entry 209 (class 1259 OID 33219)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO admin;

--
-- TOC entry 3434 (class 0 OID 0)
-- Dependencies: 209
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 3210 (class 2604 OID 41392)
-- Name: buses id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.buses ALTER COLUMN id SET DEFAULT nextval('public.buses_id_seq'::regclass);


--
-- TOC entry 3217 (class 2604 OID 41437)
-- Name: cities id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.cities ALTER COLUMN id SET DEFAULT nextval('public.cities_id_seq'::regclass);


--
-- TOC entry 3226 (class 2604 OID 41486)
-- Name: reservations id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.reservations ALTER COLUMN id SET DEFAULT nextval('public.reservations_id_seq'::regclass);


--
-- TOC entry 3213 (class 2604 OID 41403)
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- TOC entry 3214 (class 2604 OID 41421)
-- Name: seats id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.seats ALTER COLUMN id SET DEFAULT nextval('public.seats_id_seq'::regclass);


--
-- TOC entry 3223 (class 2604 OID 41462)
-- Name: trip_legs id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.trip_legs ALTER COLUMN id SET DEFAULT nextval('public.trip_legs_id_seq'::regclass);


--
-- TOC entry 3230 (class 2604 OID 41506)
-- Name: trip_legs_reservations id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.trip_legs_reservations ALTER COLUMN id SET DEFAULT nextval('public.trip_legs_reservations_id_seq'::regclass);


--
-- TOC entry 3220 (class 2604 OID 41448)
-- Name: trips id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.trips ALTER COLUMN id SET DEFAULT nextval('public.trips_id_seq'::regclass);


--
-- TOC entry 3207 (class 2604 OID 33223)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 3405 (class 0 OID 41389)
-- Dependencies: 212
-- Data for Name: buses; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.buses (id, plate, model, created_at, updated_at, deleted_at) VALUES (1, 'BBB-5678', 'Modelo brabo', '2022-02-21 18:46:36.521632', '2022-02-21 18:47:26.529', NULL);


--
-- TOC entry 3411 (class 0 OID 41434)
-- Dependencies: 218
-- Data for Name: cities; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.cities (id, name, created_at, updated_at, deleted_at) VALUES (1, 'Porto Alegre', '2022-02-21 22:13:32.866843', '2022-02-21 22:13:50.562', NULL);
INSERT INTO public.cities (id, name, created_at, updated_at, deleted_at) VALUES (2, 'São Paulo', '2022-02-21 22:32:58.990507', '2022-02-21 22:32:58.990507', NULL);
INSERT INTO public.cities (id, name, created_at, updated_at, deleted_at) VALUES (3, 'São Paulo', '2022-02-21 22:33:51.735931', '2022-02-21 22:33:51.735931', '2022-02-21 22:59:17.508');


--
-- TOC entry 3417 (class 0 OID 41483)
-- Dependencies: 224
-- Data for Name: reservations; Type: TABLE DATA; Schema: public; Owner: admin
--



--
-- TOC entry 3407 (class 0 OID 41400)
-- Dependencies: 214
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.roles (id, name) VALUES (1, 'user');
INSERT INTO public.roles (id, name) VALUES (2, 'admin');
INSERT INTO public.roles (id, name) VALUES (3, 'root');


--
-- TOC entry 3409 (class 0 OID 41418)
-- Dependencies: 216
-- Data for Name: seats; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.seats (id, bus_id, name, description, created_at, updated_at, deleted_at) VALUES (1, 1, 'A2', 'corridor', '2022-02-21 18:51:13.962807', '2022-02-21 18:51:34.308', NULL);


--
-- TOC entry 3415 (class 0 OID 41459)
-- Dependencies: 222
-- Data for Name: trip_legs; Type: TABLE DATA; Schema: public; Owner: admin
--



--
-- TOC entry 3419 (class 0 OID 41503)
-- Dependencies: 226
-- Data for Name: trip_legs_reservations; Type: TABLE DATA; Schema: public; Owner: admin
--



--
-- TOC entry 3413 (class 0 OID 41445)
-- Dependencies: 220
-- Data for Name: trips; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.trips (id, price, tripdate, bus_id, created_at, updated_at, deleted_at) VALUES (1, 113.5, '2021-11-23 02:05:19.723128', 1, '2022-02-21 22:31:21.114138', '2022-02-21 22:31:21.114138', NULL);


--
-- TOC entry 3403 (class 0 OID 33220)
-- Dependencies: 210
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.users (id, role_id, name, email, password, document, birthdate, phone_type, phone, addr_postal_code, addr_street, addr_number, addr_additional_info, neighbourhood, city, state, enable_sms, created_at, updated_at, deleted_at) VALUES (8, 2, 'Rafael Teixeira', 'rodriguesteixeirarafael@gmail.com', '$2b$10$NNi7mp.Jj7g.mp90oOFHKOea2.nWAENrEo8ZGcajyMgXdDyWQlqJm', '33333333333', '1997-02-22', 1, '53981495088', '90520080', 'Rua Luzitana', '801', 'Apto 403', 'Higienópolis', 'Porto Alegre', 'Rio Grande do Sul', false, '2022-02-21 18:45:12.546681', '2022-02-21 18:55:28.347', NULL);


--
-- TOC entry 3435 (class 0 OID 0)
-- Dependencies: 211
-- Name: buses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.buses_id_seq', 1, true);


--
-- TOC entry 3436 (class 0 OID 0)
-- Dependencies: 217
-- Name: cities_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.cities_id_seq', 3, true);


--
-- TOC entry 3437 (class 0 OID 0)
-- Dependencies: 223
-- Name: reservations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.reservations_id_seq', 1, false);


--
-- TOC entry 3438 (class 0 OID 0)
-- Dependencies: 213
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.roles_id_seq', 3, true);


--
-- TOC entry 3439 (class 0 OID 0)
-- Dependencies: 215
-- Name: seats_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.seats_id_seq', 1, true);


--
-- TOC entry 3440 (class 0 OID 0)
-- Dependencies: 221
-- Name: trip_legs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.trip_legs_id_seq', 1, false);


--
-- TOC entry 3441 (class 0 OID 0)
-- Dependencies: 225
-- Name: trip_legs_reservations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.trip_legs_reservations_id_seq', 1, false);


--
-- TOC entry 3442 (class 0 OID 0)
-- Dependencies: 219
-- Name: trips_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.trips_id_seq', 1, true);


--
-- TOC entry 3443 (class 0 OID 0)
-- Dependencies: 209
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.users_id_seq', 9, true);


--
-- TOC entry 3238 (class 2606 OID 41398)
-- Name: buses buses_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.buses
    ADD CONSTRAINT buses_pkey PRIMARY KEY (id);


--
-- TOC entry 3244 (class 2606 OID 41443)
-- Name: cities cities_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.cities
    ADD CONSTRAINT cities_pkey PRIMARY KEY (id);


--
-- TOC entry 3250 (class 2606 OID 41491)
-- Name: reservations reservations_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.reservations
    ADD CONSTRAINT reservations_pkey PRIMARY KEY (id);


--
-- TOC entry 3240 (class 2606 OID 41407)
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- TOC entry 3242 (class 2606 OID 41427)
-- Name: seats seats_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.seats
    ADD CONSTRAINT seats_pkey PRIMARY KEY (id);


--
-- TOC entry 3248 (class 2606 OID 41466)
-- Name: trip_legs trip_legs_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.trip_legs
    ADD CONSTRAINT trip_legs_pkey PRIMARY KEY (id);


--
-- TOC entry 3252 (class 2606 OID 41510)
-- Name: trip_legs_reservations trip_legs_reservations_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.trip_legs_reservations
    ADD CONSTRAINT trip_legs_reservations_pkey PRIMARY KEY (id);


--
-- TOC entry 3246 (class 2606 OID 41452)
-- Name: trips trips_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.trips
    ADD CONSTRAINT trips_pkey PRIMARY KEY (id);


--
-- TOC entry 3234 (class 2606 OID 41416)
-- Name: users unique_email; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT unique_email UNIQUE (email);


--
-- TOC entry 3236 (class 2606 OID 33229)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 3254 (class 2606 OID 41428)
-- Name: seats fk_bus; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.seats
    ADD CONSTRAINT fk_bus FOREIGN KEY (bus_id) REFERENCES public.buses(id);


--
-- TOC entry 3255 (class 2606 OID 41453)
-- Name: trips fk_bus; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.trips
    ADD CONSTRAINT fk_bus FOREIGN KEY (bus_id) REFERENCES public.buses(id);


--
-- TOC entry 3258 (class 2606 OID 41477)
-- Name: trip_legs fk_destination; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.trip_legs
    ADD CONSTRAINT fk_destination FOREIGN KEY (destination_id) REFERENCES public.cities(id) NOT VALID;


--
-- TOC entry 3257 (class 2606 OID 41472)
-- Name: trip_legs fk_origin; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.trip_legs
    ADD CONSTRAINT fk_origin FOREIGN KEY (origin_id) REFERENCES public.cities(id) NOT VALID;


--
-- TOC entry 3262 (class 2606 OID 41516)
-- Name: trip_legs_reservations fk_reservation; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.trip_legs_reservations
    ADD CONSTRAINT fk_reservation FOREIGN KEY (reservation_id) REFERENCES public.reservations(id) NOT VALID;


--
-- TOC entry 3253 (class 2606 OID 41408)
-- Name: users fk_role; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES public.roles(id) NOT VALID;


--
-- TOC entry 3260 (class 2606 OID 41497)
-- Name: reservations fk_seat; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.reservations
    ADD CONSTRAINT fk_seat FOREIGN KEY (seat_id) REFERENCES public.seats(id) NOT VALID;


--
-- TOC entry 3256 (class 2606 OID 41467)
-- Name: trip_legs fk_trip; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.trip_legs
    ADD CONSTRAINT fk_trip FOREIGN KEY (trip_id) REFERENCES public.trips(id);


--
-- TOC entry 3261 (class 2606 OID 41511)
-- Name: trip_legs_reservations fk_trip_leg; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.trip_legs_reservations
    ADD CONSTRAINT fk_trip_leg FOREIGN KEY (trip_leg_id) REFERENCES public.trip_legs(id) NOT VALID;


--
-- TOC entry 3259 (class 2606 OID 41492)
-- Name: reservations fk_user; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.reservations
    ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public.users(id) NOT VALID;


-- Completed on 2022-02-21 23:43:09 UTC

--
-- PostgreSQL database dump complete
--