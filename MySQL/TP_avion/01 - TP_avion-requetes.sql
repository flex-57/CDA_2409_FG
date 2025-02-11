USE TP_AVION;

-- 1
SELECT vol, vd, hd FROM vol WHERE vd = 'PARIS' AND hd BETWEEN 12 AND 14;

-- 2
SELECT pilnom FROM pilote WHERE pilnom LIKE 'S%';

-- 3
SELECT loc, COUNT(*), MIN(cap), MAX(cap) FROM avion GROUP BY loc;

-- 4
SELECT loc, avmarq, AVG(cap) FROM avion GROUP BY loc, avmarq;

-- 5
SELECT ROUND(AVG(cap), 2), loc FROM avion GROUP BY loc HAVING COUNT(*) > 1; 

-- 6
SELECT p.pilnom, a.loc FROM pilote p
	JOIN avion a ON p.adr = a.loc
	WHERE a.avmarq = 'AIRBUS';
	
-- 7
SELECT distinct p.pilnom FROM pilote p
	JOIN avion a ON p.adr = a.loc
	JOIN vol v ON v.av = a.av
	WHERE a.avmarq = 'AIRBUS' AND v.pil = p.pil;


SELECT distinct p.pilnom FROM pilote p
 	JOIN vol v
 JOIN avion a 
	WHERE avmarq = 'AIRBUS' AND p.adr=a.loc  ;
	
	

-- 8
SELECT distinct p.pilnom FROM pilote p
	JOIN avion a ON p.adr = a.loc
	JOIN vol v ON v.av = a.av
	WHERE avmarq = 'AIRBUS' OR v.pil = p.pil;
	
	SELECT distinct p.pilnom FROM pilote p
NATURAL 	JOIN vol v
NATURAL JOIN avion a 
	WHERE avmarq = 'AIRBUS' OR p.adr=a.loc  ;

	
-- 9
/*
SELECT distinct p.pilnom FROM pilote p
	JOIN avion a ON p.adr = a.loc
	JOIN vol v ON v.av = a.av
	WHERE avmarq = 'AIRBUS' OR v.pil = p.pil;
*/


