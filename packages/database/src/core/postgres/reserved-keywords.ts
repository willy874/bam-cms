const RESERVED_KEYWORDS =
  'ABORT,ABSOLUTE,ACCESS,ACTION,ADD,ADMIN,AFTER,AGGREGATE,ALL,ALSO,ALTER,ALWAYS,ANALYSE,ANALYZE,AND,ANY,ARRAY,AS,ASC,ASSERTION,ASSIGNMENT,ASYMMETRIC,' +
  'AT,ATTACH,ATTRIBUTE,AUTHORIZATION,BACKWARD,BEFORE,BEGIN,BETWEEN,BIGINT,BINARY,BIT,BLOB,BOOLEAN,BOTH,BY,CACHE,CALLED,CASCADE,CASCADED,CASE,CAST,CATALOG' +
  ',CATFUNCTION,CATPROCEDURE,CATSCHEMA,CATTABLE,CATTYPE,CHAIN,CHAR,CHARACTER,CHARACTERISTICS,CHECK,CLOSE,CLUSTER,COALESCE,COLLATE,COLLATION,COLUMN,COMMENT' +
  ',COMMIT,COMMITTED,CONCURRENTLY,CONFIGURATION,CONNECT,CONNECTION,CONSTRAINT,CONSTRAINTS,CONTENT,CONTINUE,CONVERSION,COPY,COST,CREATE,CROSS,CSV,CUBE,' +
  'CURRENT,CURRENT_CATALOG,CURRENT_DATE,CURRENT_ROLE,CURRENT_SCHEMA,CURRENT_TIME,CURRENT_TIMESTAMP,CURRENT_USER,CURSOR,CYCLE,DATABASE,DAY,DBCC,DEALLOCATE,' +
  'DEC,DECIMAL,DECLARE,DEFAULT,DEFAULTS,DEFERRABLE,DEFERRED,DEFINED,DEFINER,DELETE,DELIMITER,DELIMITERS,DEPENDS,DESC,DETACH,DIAGNOSTICS,DISABLE,DISTINCT,' +
  'DO,DOMAIN,DOUBLE,DROP,EACH,ELSE,ENABLE,ENCODING,ENCRYPTED,END,ENUM,ESCAPE,EXCEPT,EXCLUDE,EXCLUDING,EXCLUSIVE,EXECUTE,EXISTS,EXPLODE,EXPLAIN,EXTENSION,' +
  'EXTERNAL,EXTRACT,FALSE,FAMILY,FETCH,FILTER,FIRST,FLOAT,FOLLOWING,FOR,FORCE,FOREIGN,FREEZE,FROM,FULL,FUNCTION,FUNCTIONS,GENERAL,GLOB,GOTO,GRANT,GRANTED,' +
  'GREATEST,GROUP,GROUPING,HANDLER,HAVING,HEADER,HEX,HIERARCHY,HOLD,HOUR,IDLE,IF,ILIKE,IMMEDIATE,IMMUTABLE,IMPLICIT,IN,INCLUDING,INCREMENT,INDEX,INDEXES,' +
  'INHERIT,INHERITS,INITIALLY,INLINE,INNER,INOUT,INPUT,INSENSITIVE,INSERT,INSTEAD,INT,INTEGER,INTERSECT,INTERVAL,INTO,INVOKER,IS,ISNULL,ISOLATION,JOIN,' +
  'KEY,KEYS,LABEL,LARGE,LAST,LATERAL,LEADING,LEAKPROOF,LEAST,LEFT,LEVEL,LIKE,LIMIT,LIMITED,LINUX_LOCALE,LISTEN,LOAD,LOCAL,LOCALTIME,LOCALTIMESTAMP,' +
  'LOCATION,LOCK,LOCKED,LOGGED,MAPPING,MATCH,MAXVALUE,MERGE,MESSAGE_LENGTH,MESSAGE_OCTET_LENGTH,MESSAGE_TEXT,METHOD,MINUTE,MINVALUE,MODE,MONTH,MOVE,NAME,' +
  'NAMES,NATIONAL,NATURAL,NCHAR,NCLOB,NESTED,NEXT,NO,NOBYPASSRLS,NOCREATEDB,NOCREATEROLE,NOCREATEUSER,NODE,NONE,NORMALIZE,NORMALIZED,NOT,NOTHING,NOTIFY,' +
  'NOWAIT,NULL,NULLIF,NULLS,NUMERIC,OBJECT,OF,OFF,OFFSET,OIDS,OLD,ON,ONLY,OPERATOR,OPTION,OPTIONS,OR,ORDER,ORDINALITY,OTHERS,OUT,OUTER,OVER,OVERLAPS,' +
  'OWNED,OWNER,PASSWORD,PATH,PERCENTILE_CONT,PERCENTILE_DISC,PERCENT_RANK,PLACING,PLANS,PLI,POSITION,PRECEDING,PRESERVE,PRIMARY,PRIOR,PRIVILEGES,' +
  'PROCEDURAL,PROCEDURE,PROGRAM,QUOTE,RANGE,READ,REAL,REASSIGN,RECHECK,RECURSIVE,REF,REFERENCES,REFRESH,REINDEX,RELATIVE,RELEASE,RENAME,REPEATABLE,REPLACE,' +
  'REPLICA,RESET,RESPECT,RESTART,RESTRICT,RETURNING,RETURNS,REVOKE,RIGHT,ROLE,ROLLBACK,ROLLUP,ROUTINE,ROW,ROWS,RULE,SAMPLE,SAVEPOINT,SCHEMA,SCROLL,' +
  'SEARCH,SECOND,SECURITY,SELECT,SEQUENCE,SERIALIZABLE,SERVER,SESSION,SET,SETOF,SETS,SHARE,SHOW,SIMILAR,SIMPLE,SKIP,SMALLINT,SNAPSHOT,SOME,SQL,STABLE,' +
  'STANDALONE,START,STATEMENT,STATISTICS,STDIN,STDOUT,STORAGE,STRICT,STRIP,SUBSCRIPTION,SUBSTR,SUM,SUPERUSER,SYMMETRIC,SYSID,TABLE,TABLES,TABLESAMPLE,' +
  'TABLESPACE,TEMP,TEMPLATE,TEMPORARY,TEXT,THEN,TIME,TIMEZONE,TITLE,TO,TRAILING,TRANSACTION,TREAT,TRIGGER,TRIM,TRUE,TRUNCATE,TRUSTED,TYPE,UNBOUNDED,' +
  'UNCOMMITTED,UNDER,UNENCRYPTED,UNION,UNIQUE,UNKNOWN,UNLISTEN,UNLOGGED,UNTIL,UPDATE,USER,USING,VACUUM,VALID,VALIDATE,VALIDATOR,VALUE,VALUES,VARCHAR,' +
  'VARIADIC,VARYING,VERBOSE,VERSION,VIEW,VIEWS,VOLATILE,WHEN,WHERE,WHITESPACE,WINDOW,WITH,WITHIN,WITHOUT,WORK,WRAPPER,WRITE,XMLEXISTS,XMLFOREST,XMLPARSE,' +
  'XMLPI,XMLROOT,XMLSERIALIZE,YEAR,YOUR,ZONE';

export default RESERVED_KEYWORDS;
