
--
-- PostgreSQL database dump
--

-- Dumped from database version 14.1 (Debian 14.1-1.pgdg110+1)
-- Dumped by pg_dump version 14.1

-- Started on 2022-02-07 23:34:04 UTC

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
-- TOC entry 3419 (class 1262 OID 16627)
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

--
-- TOC entry 3 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: admin
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO admin;

--
-- TOC entry 3420 (class 0 OID 0)
-- Dependencies: 3
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: admin
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 213 (class 1259 OID 16651)
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
-- TOC entry 212 (class 1259 OID 16650)
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
-- TOC entry 3421 (class 0 OID 0)
-- Dependencies: 212
-- Name: buses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.buses_id_seq OWNED BY public.buses.id;


--
-- TOC entry 218 (class 1259 OID 16693)
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
-- TOC entry 219 (class 1259 OID 16696)
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
-- TOC entry 3422 (class 0 OID 0)
-- Dependencies: 219
-- Name: cities_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.cities_id_seq OWNED BY public.cities.id;


--
-- TOC entry 223 (class 1259 OID 16734)
-- Name: reservations; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.reservations (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    seat_id bigint NOT NULL,
    transaction_id character varying(15),
    approved boolean,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp without time zone
);


ALTER TABLE public.reservations OWNER TO admin;

--
-- TOC entry 222 (class 1259 OID 16733)
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
-- TOC entry 3423 (class 0 OID 0)
-- Dependencies: 222
-- Name: reservations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.reservations_id_seq OWNED BY public.reservations.id;


--
-- TOC entry 210 (class 1259 OID 16629)
-- Name: roles; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.roles (
    id bigint NOT NULL,
    name character varying(500) NOT NULL
);


ALTER TABLE public.roles OWNER TO admin;

--
-- TOC entry 209 (class 1259 OID 16628)
-- Name: role_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.role_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.role_id_seq OWNER TO admin;

--
-- TOC entry 3424 (class 0 OID 0)
-- Dependencies: 209
-- Name: role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.role_id_seq OWNED BY public.roles.id;


--
-- TOC entry 215 (class 1259 OID 16664)
-- Name: seats; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.seats (
    id bigint NOT NULL,
    bus_id integer NOT NULL,
    name character varying(500) NOT NULL,
    description character varying(500) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp without time zone
);


ALTER TABLE public.seats OWNER TO admin;

--
-- TOC entry 214 (class 1259 OID 16663)
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
-- TOC entry 3425 (class 0 OID 0)
-- Dependencies: 214
-- Name: seats_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.seats_id_seq OWNED BY public.seats.id;


--
-- TOC entry 217 (class 1259 OID 16680)
-- Name: trips; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.trips (
    id bigint NOT NULL,
    price double precision NOT NULL,
    tripdate timestamp without time zone NOT NULL,
    bus_id bigint NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp without time zone,
    trip_type bigint
);


ALTER TABLE public.trips OWNER TO admin;

--
-- TOC entry 216 (class 1259 OID 16679)
-- Name: trip_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.trip_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.trip_id_seq OWNER TO admin;

--
-- TOC entry 3426 (class 0 OID 0)
-- Dependencies: 216
-- Name: trip_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.trip_id_seq OWNED BY public.trips.id;


--
-- TOC entry 221 (class 1259 OID 16708)
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
-- TOC entry 220 (class 1259 OID 16707)
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
-- TOC entry 3427 (class 0 OID 0)
-- Dependencies: 220
-- Name: trip_legs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.trip_legs_id_seq OWNED BY public.trip_legs.id;


--
-- TOC entry 225 (class 1259 OID 24820)
-- Name: trip_types; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.trip_types (
    id bigint NOT NULL,
    name character varying(100) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp without time zone
);


ALTER TABLE public.trip_types OWNER TO admin;

--
-- TOC entry 224 (class 1259 OID 24819)
-- Name: trip_types_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.trip_types_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.trip_types_id_seq OWNER TO admin;

--
-- TOC entry 3428 (class 0 OID 0)
-- Dependencies: 224
-- Name: trip_types_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.trip_types_id_seq OWNED BY public.trip_types.id;


--
-- TOC entry 211 (class 1259 OID 16637)
-- Name: users; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.users (
    id integer NOT NULL,
    role_id bigint NOT NULL,
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
-- TOC entry 3210 (class 2604 OID 16654)
-- Name: buses id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.buses ALTER COLUMN id SET DEFAULT nextval('public.buses_id_seq'::regclass);


--
-- TOC entry 3219 (class 2604 OID 16697)
-- Name: cities id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.cities ALTER COLUMN id SET DEFAULT nextval('public.cities_id_seq'::regclass);


--
-- TOC entry 3225 (class 2604 OID 16737)
-- Name: reservations id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.reservations ALTER COLUMN id SET DEFAULT nextval('public.reservations_id_seq'::regclass);


--
-- TOC entry 3206 (class 2604 OID 16632)
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.role_id_seq'::regclass);


--
-- TOC entry 3213 (class 2604 OID 16667)
-- Name: seats id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.seats ALTER COLUMN id SET DEFAULT nextval('public.seats_id_seq'::regclass);


--
-- TOC entry 3222 (class 2604 OID 16711)
-- Name: trip_legs id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.trip_legs ALTER COLUMN id SET DEFAULT nextval('public.trip_legs_id_seq'::regclass);


--
-- TOC entry 3228 (class 2604 OID 24823)
-- Name: trip_types id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.trip_types ALTER COLUMN id SET DEFAULT nextval('public.trip_types_id_seq'::regclass);


--
-- TOC entry 3216 (class 2604 OID 16683)
-- Name: trips id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.trips ALTER COLUMN id SET DEFAULT nextval('public.trip_id_seq'::regclass);


--
-- TOC entry 3401 (class 0 OID 16651)
-- Dependencies: 213
-- Data for Name: buses; Type: TABLE DATA; Schema: public; Owner: admin
--



--
-- TOC entry 3406 (class 0 OID 16693)
-- Dependencies: 218
-- Data for Name: cities; Type: TABLE DATA; Schema: public; Owner: admin
--



--
-- TOC entry 3411 (class 0 OID 16734)
-- Dependencies: 223
-- Data for Name: reservations; Type: TABLE DATA; Schema: public; Owner: admin
--



--
-- TOC entry 3398 (class 0 OID 16629)
-- Dependencies: 210
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: admin
--



--
-- TOC entry 3403 (class 0 OID 16664)
-- Dependencies: 215
-- Data for Name: seats; Type: TABLE DATA; Schema: public; Owner: admin
--



--
-- TOC entry 3409 (class 0 OID 16708)
-- Dependencies: 221
-- Data for Name: trip_legs; Type: TABLE DATA; Schema: public; Owner: admin
--



--
-- TOC entry 3413 (class 0 OID 24820)
-- Dependencies: 225
-- Data for Name: trip_types; Type: TABLE DATA; Schema: public; Owner: admin
--



--
-- TOC entry 3405 (class 0 OID 16680)
-- Dependencies: 217
-- Data for Name: trips; Type: TABLE DATA; Schema: public; Owner: admin
--



--
-- TOC entry 3399 (class 0 OID 16637)
-- Dependencies: 211
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: admin
--



--
-- TOC entry 3429 (class 0 OID 0)
-- Dependencies: 212
-- Name: buses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.buses_id_seq', 1, false);


--
-- TOC entry 3430 (class 0 OID 0)
-- Dependencies: 219
-- Name: cities_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.cities_id_seq', 1, false);


--
-- TOC entry 3431 (class 0 OID 0)
-- Dependencies: 222
-- Name: reservations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.reservations_id_seq', 1, false);


--
-- TOC entry 3432 (class 0 OID 0)
-- Dependencies: 209
-- Name: role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.role_id_seq', 1, false);


--
-- TOC entry 3433 (class 0 OID 0)
-- Dependencies: 214
-- Name: seats_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.seats_id_seq', 1, false);


--
-- TOC entry 3434 (class 0 OID 0)
-- Dependencies: 216
-- Name: trip_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.trip_id_seq', 1, false);


--
-- TOC entry 3435 (class 0 OID 0)
-- Dependencies: 220
-- Name: trip_legs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.trip_legs_id_seq', 1, false);


--
-- TOC entry 3436 (class 0 OID 0)
-- Dependencies: 224
-- Name: trip_types_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.trip_types_id_seq', 1, false);


--
-- TOC entry 3242 (class 2606 OID 16706)
-- Name: cities cities_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.cities
    ADD CONSTRAINT cities_pkey PRIMARY KEY (id);


--
-- TOC entry 3234 (class 2606 OID 16660)
-- Name: buses pk; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.buses
    ADD CONSTRAINT pk PRIMARY KEY (id);


--
-- TOC entry 3248 (class 2606 OID 16741)
-- Name: reservations reservations_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.reservations
    ADD CONSTRAINT reservations_pkey PRIMARY KEY (id);


--
-- TOC entry 3232 (class 2606 OID 16636)
-- Name: roles role_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT role_pkey PRIMARY KEY (id);


--
-- TOC entry 3238 (class 2606 OID 16673)
-- Name: seats seats_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.seats
    ADD CONSTRAINT seats_pkey PRIMARY KEY (id);


--
-- TOC entry 3246 (class 2606 OID 16715)
-- Name: trip_legs trip_legs_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.trip_legs
    ADD CONSTRAINT trip_legs_pkey PRIMARY KEY (id);


--
-- TOC entry 3240 (class 2606 OID 16687)
-- Name: trips trip_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.trips
    ADD CONSTRAINT trip_pkey PRIMARY KEY (id);


--
-- TOC entry 3250 (class 2606 OID 24827)
-- Name: trip_types trip_types_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.trip_types
    ADD CONSTRAINT trip_types_pkey PRIMARY KEY (id);


--
-- TOC entry 3236 (class 2606 OID 16662)
-- Name: buses unique_plate; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.buses
    ADD CONSTRAINT unique_plate UNIQUE (plate);


--
-- TOC entry 3243 (class 1259 OID 16732)
-- Name: fki_destination_fk; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX fki_destination_fk ON public.trip_legs USING btree (destination_id);


--
-- TOC entry 3244 (class 1259 OID 16726)
-- Name: fki_origin_fk; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX fki_origin_fk ON public.trip_legs USING btree (origin_id);


--
-- TOC entry 3252 (class 2606 OID 16674)
-- Name: seats bus_id; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.seats
    ADD CONSTRAINT bus_id FOREIGN KEY (bus_id) REFERENCES public.buses(id);


--
-- TOC entry 3257 (class 2606 OID 16727)
-- Name: trip_legs destination_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.trip_legs
    ADD CONSTRAINT destination_fk FOREIGN KEY (destination_id) REFERENCES public.cities(id) NOT VALID;


--
-- TOC entry 3256 (class 2606 OID 16721)
-- Name: trip_legs origin_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.trip_legs
    ADD CONSTRAINT origin_fk FOREIGN KEY (origin_id) REFERENCES public.cities(id) NOT VALID;


--
-- TOC entry 3253 (class 2606 OID 16688)
-- Name: trips trip_bus_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.trips
    ADD CONSTRAINT trip_bus_id_fkey FOREIGN KEY (bus_id) REFERENCES public.buses(id);


--
-- TOC entry 3255 (class 2606 OID 16716)
-- Name: trip_legs trip_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.trip_legs
    ADD CONSTRAINT trip_fk FOREIGN KEY (trip_id) REFERENCES public.trips(id);


--
-- TOC entry 3254 (class 2606 OID 24828)
-- Name: trips trip_type_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.trips
    ADD CONSTRAINT trip_type_fk FOREIGN KEY (trip_type) REFERENCES public.trip_types(id) NOT VALID;


--
-- TOC entry 3251 (class 2606 OID 16645)
-- Name: users users_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(id) NOT VALID;


-- Completed on 2022-02-07 23:34:04 UTC

--
-- PostgreSQL database dump complete
--
