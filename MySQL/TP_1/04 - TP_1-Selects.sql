USE TP_1;

-- Première partie
-- 1
SELECT ename, job, empno, sal FROM emp WHERE deptno = 10;

-- 2
SELECT ename, job, sal FROM emp WHERE job = 'MANAGER' AND sal > 2800;

-- 3
SELECT ename FROM emp WHERE job = 'MANAGER' AND deptno <> 30;

-- 4
SELECT ename FROM emp WHERE sal BETWEEN 1200 AND 1400;

-- 5
SELECT ename FROM emp WHERE deptno = 10 OR deptno = 30 ORDER BY ename ASC;

-- 6
SELECT ename, sal FROM emp WHERE deptno = 30 ORDER BY sal ASC, ename ASC;

-- 7
SELECT ename, job, sal FROM emp ORDER BY job DESC, sal DESC;

-- 8
SELECT DISTINCT job FROM emp;

-- 9
SELECT d.loc FROM emp e
	JOIN dept d ON e.deptno = d.deptno
	WHERE e.ename = 'ALLEN';

-- 10
SELECT d.loc, e.ename, e.job, e.sal FROM dept d
	JOIN emp e ON d.deptno = e.deptno
    ORDER BY d.loc DESC, e.sal DESC;

-- 11
SELECT ename, sal, comm, sal + comm FROM emp WHERE job = 'SALESMAN';

-- 12
SET lc_time_names = "fr_FR";
SELECT ename, job, UPPER(DATE_FORMAT(hiredate, "%a %d %b %Y" )) date_ FROM emp
WHERE deptno = 20;

-- 13
SELECT MAX(sal) 'salaire max', deptno FROM emp GROUP BY deptno;

-- 14
SELECT deptno, SUM(sal + COALESCE(comm, 0)) 'masse salarial', COUNT(*) 'nb_employé', ROUND(AVG(sal), 2) 'salaire moyen' FROM emp
	GROUP BY deptno;

-- 15
SELECT job, SUM(sal + COALESCE(comm, 0)) 'masse salarial', COUNT(*) 'nb_employé', ROUND(AVG(sal), 2) 'salaire moyen' FROM emp
	GROUP BY job
    HAVING COUNT(*) > 1;

-- 16
SELECT e.ename, e.sal, e.job, d.loc FROM emp e
	JOIN dept d ON e.deptno = d.deptno
    WHERE job = (SELECT job FROM emp WHERE ename = 'JONES');

-- 17
SELECT ename, sal FROM emp
	GROUP BY sal, ename
    HAVING sal > (SELECT AVG(sal) FROM emp);

-- 18 
CREATE TABLE projet (
	num_proj SMALLINT AUTO_INCREMENT,
	nom_proj CHAR(5) NOT NULL,
	budjet_proj DECIMAL(8,2) NOT NULL, CONSTRAINT PK_projet PRIMARY KEY(num_proj)
);

 ALTER TABLE projet AUTO_INCREMENT = 101;

INSERT INTO projet (nom_proj, budjet_proj) VALUES ('alpha',96000), ('beta',82000), ('gamma',15000);

ALTER TABLE projet RENAME COLUMN budjet_proj TO budget_proj;

-- 19
ALTER TABLE EMP ADD num_proj SMALLINT;

UPDATE emp SET num_proj = 101 WHERE deptno = 30 AND job = 'salesman';
UPDATE emp SET num_proj = 102 WHERE num_proj IS NULL;

-- 20
DROP VIEW vue;
CREATE VIEW vue AS
	SELECT e.ename, e.job, d.loc, p.nom_proj FROM emp e
		JOIN dept d ON e.deptno = d.deptno
        JOIN projet p ON p.num_proj = e.num_proj;

-- 21
SELECT ename, job, loc, nom_proj FROM vue
	ORDER BY loc, nom_proj;

-- 22
SELECT nom_proj FROM vue
	WHERE job = 'MANAGER';

-- Deuxième partie
-- 1
SELECT ename FROM emp
	WHERE job = 'MANAGER' AND (deptno = 20 OR deptno = 30);

-- 2
SELECT ename FROM emp
	WHERE job <> 'MANAGER' AND hiredate LIKE '%81%';

-- 3
SELECT ename FROM emp
	WHERE comm IS NOT NULL;

-- 4
SELECT ename, deptno, job, hiredate FROM emp 
	ORDER BY hiredate DESC, deptno, job;
    
-- 5
SELECT e.ename FROM emp e
	JOIN dept d ON e.deptno = d.deptno
    WHERE d.loc = 'DALLAS';

-- 6
SELECT e.ename, e.hiredate, m.ename 'mgr name', m.hiredate 'mgr date' FROM emp e
	JOIN emp m ON e.empno = m.mgr
    WHERE e.hiredate < m.hiredate;
	
-- 7
SELECT e.empno, e.mgr FROM emp e
	JOIN emp m ON e.empno = m.empno
    WHERE m.mgr <> e.empno;

-- 8
SELECT e.ename, n.hiredate FROM emp e
	JOIN emp n ON e.mgr = n.empno
    WHERE e.hiredate >= n.hiredate;

-- 9




