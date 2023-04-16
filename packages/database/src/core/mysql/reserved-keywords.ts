const RESERVED_KEYWORDS =
  'ACCESSIBLE,ACCOUNT,ACTION,ADD,ADMIN,AFTER,AGAINST,AGGREGATE,ALGORITHM,ALL,ALTER,ANALYZE,AND,ANY,AS,ASC,ASCII,ASENSITIVE,AT,AUTO_INCREMENT,AVG,' +
  'AVG_ROW_LENGTH,BACKUP,BEFORE,BEGIN,BETWEEN,BIGINT,BINARY,BINLOG,BIT,BLOB,BLOCK,BOOL,BOOLEAN,BOTH,BTREE,BY,BYTE,CACHE,CALL,CASCADE,CASCADED,CASE,' +
  'CAST,CATALOG_NAME,CHAIN,CHANGE,CHANGED,CHANNEL,CHAR,CHARACTER,CHARSET,CHECK,CHECKSUM,CIPHER,CLASS_ORIGIN,CLIENT,CLOSE,COALESCE,CODE,COLLATE,COLLATION,' +
  'COLUMN,COLUMN_FORMAT,COLUMN_NAME,COLUMNS,COMMENT,COMMIT,COMMITTED,COMPACT,COMPLETION,COMPRESSED,COMPRESSION,CONCURRENT,CONDITION,CONNECTION,CONSISTENT,' +
  'CONSTRAINT,CONSTRAINT_CATALOG,CONSTRAINT_NAME,CONSTRAINT_SCHEMA,CONTAINS,CONTEXT,CONTINUE,CONVERT,CPU,CREATE,CROSS,CUBE,CURRENT,CURRENT_DATE,' +
  'CURRENT_TIME,CURRENT_TIMESTAMP,CURRENT_USER,CURSOR,CURSOR_NAME,DATA,DATABASE,DATABASES,DATAFILE,DATE,DATETIME,DAY,DAY_HOUR,DAY_MICROSECOND,' +
  'DAY_MINUTE,DAY_SECOND,DEALLOCATE,DEC,DECIMAL,DECLARE,DEFAULT,DEFAULT_AUTH,DEFINER,DELAYED,DELAY_KEY_WRITE,DELETE,DESC,DESCRIBE,DES_KEY_FILE,' +
  'DETERMINISTIC,DIAGNOSTICS,DIRECTORY,DISABLE,DISCARD,DISK,DISTINCT,DISTINCTROW,DIV,DO,DOUBLE,DROP,DUAL,DUMPFILE,DUPLICATE,DYNAMIC,EACH,ELSE,ELSEIF,' +
  'ENABLE,ENCLOSED,ENCRYPTION,END,ENDS,ENGINE,ENGINES,ENUM,ERROR,ERRORS,ESCAPE,ESCAPED,EVENT,EVENTS,EVERY,EXCHANGE,EXECUTE,EXISTS,EXIT,EXPANSION,EXPIRE,' +
  'EXPLAIN,EXPORT,EXTENDED,EXTENT_SIZE,FALSE,FAST,FAULTS,FETCH,FIELDS,FILE,FILE_BLOCK_SIZE,FILTER,FIRST,FIXED,FLOAT,FLOAT4,FLOAT8,FLUSH,FOLLOWS,FOR,' +
  'FORCE,FOREIGN,FORMAT,FOUND,FROM,FULL,FULLTEXT,FUNCTION,GENERAL,GENERATED,GEOMETRY,GEOMETRYCOLLECTION,GET,GET_FORMAT,GLOBAL,GRANT,GROUP,GROUP_REPLICATION,' +
  'HANDLER,HASH,HAVING,HELP,HIGH_PRIORITY,HISTOGRAM,HISTORY,HOST,HOUR,HOUR_MICROSECOND,HOUR_MINUTE,HOUR_SECOND,IDENTIFIED,IF,IGNORE,IGNORE_SERVER_IDS,' +
  'IMPORT,IN,INDEX,INDEXES,INFILE,INITIAL_SIZE,INNER,INOUT,INSENSITIVE,INSERT,INSERT_METHOD,INSTALL,INSTANCE,INT,INT1,INT2,INT3,INT4,INT8,INTEGER,INTERVAL,' +
  'INTO,INVOKER,IO,IO_AFTER_GTIDS,IO_BEFORE_GTIDS,IO_THREAD,IPC,IS,ISOLATION,ISSUER,ITERATE,JOIN,JSON,KEY,KEY_BLOCK_SIZE,KEYS,KILL,LAST,LAST_INSERT_ID,' +
  'LEADING,LEAVE,LEAVES,LEFT,LESS,LIMIT,LINEAR,LINES,LINESTRING,LIST,LOAD,LOCAL,LOCK,LOCKS,LOGFILE,LOGS,LONG,LONGBLOB,LONGTEXT,LOOP,LOW_PRIORITY,MASTER,' +
  'MASTER_AUTO_POSITION,MASTER_BIND,MASTER_CONNECT_RETRY,MASTER_DELAY,MASTER_HEARTBEAT_PERIOD,MASTER_HOST,MASTER_LOG_FILE,MASTER_LOG_POS,MASTER_PASSWORD,' +
  'MASTER_PORT,MASTER_RETRY_COUNT,MASTER_SERVER_ID,MASTER_SSL,MASTER_SSL_CA,MASTER_SSL_CAPATH,MASTER_SSL_CERT,MASTER_SSL_CIPHER,MASTER_SSL_CRL,' +
  'MASTER_SSL_CRLPATH,MASTER_SSL_KEY,MASTER_SSL_VERIFY_SERVER_CERT,MASTER_USER,MATCH,MAXVALUE,MAX_CONNECTIONS_PER_HOUR,MAX_QUERIES_PER_HOUR,' +
  'MAX_ROWS,MAX_SIZE,MAX_STATEMENT_TIME,MAX_UPDATES_PER_HOUR,MAX_USER_CONNECTIONS,MEDIUM,MEDIUMBLOB,MEDIUMINT,MEDIUMTEXT,MERGE,METHOD,MICROSECOND,' +
  'MIDDLEINT,MINUTE,MINUTE_MICROSECOND,MINUTE_SECOND,MOD,MODE,MODIFIES,MODIFY,MONTH,MOVE,MULTILINESTRING,MULTIPOINT,MULTIPOLYGON,MYSQL_ERRNO,NAME,NAMES,' +
  'NATIONAL,NATURAL,NDJSON,NOT,NULL,NULLS,NUMBER,NUMERIC,OF,OFF,OFFSET,OLD_PASSWORD,ON,ONE,ONLY,OPEN,OPTIMIZE,OPTIMIZER_COSTS,OPTION,OPTIONALLY,OPTIONS,OR,' +
  'ORDER,OUT,OUTER,OUTFILE,OVER,OWNER,PACK_KEYS,PAGE,PARTIAL,PARTITION,PARTITIONING,PARTITIONS,PASSWORD,PHASE,PLUGIN,PLUGINS,POINT,POLYGON,POLYFROMWKB,' +
  'POLYGONFROMTEXT,POLYGONFROMWKB,PRECISION,PRIOR,PRIVILEGES,PROCEDURE,PROCESS,PROCESSLIST,PROFILE,PROFILES,PROXY,PURGE,QUARTER,QUERY,QUICK,RANGE,RANK,' +
  'READ,READ_ONLY,READ_WRITE,REAL,REBUILD,RECOVER,REDO_BUFFER_SIZE,REDUNDANT,REFERENCES,REGEXP,RELAY,RELAYLOG,RELAY_LOG_FILE,RELAY_LOG_POS,RELAY_THREAD,' +
  'RELEASE,RELOAD,REMOVE,RENAME,REORGANIZE,REPAIR,REPEAT,REPEATABLE,REPLACE,REPLICATE,REPLICATION,REQUIRE,RESET,RESIGNAL,RESTORE,RESTRICT,RESUME,RETURN,' +
  'RETURNED_SQLSTATE,RETURNS,REVERSE,REVOKE,RIGHT,RLIKE,ROLLBACK,ROLLUP,ROTATE,ROUTINE,ROW,ROWS,ROW_COUNT,ROW_FORMAT,RTREE,SCHEDULE,SCHEMA,SCHEMAS,' +
  'SCHEMA_NAME,SECOND,SECOND_MICROSECOND,SECURITY,SELECT,SENSITIVE,SEPARATOR,SERIAL,SERIALIZABLE,SERVER,SERVICE,SESSION,SET,SHARE,SHOW,SHUTDOWN,SIGNED,' +
  'SIMPLE,SLAVE,SLOW,SMALLINT,SNAPSHOT,SOCKET,SONAME,SOUNDS,SOURCE,SPATIAL,SPECIFIC,SQL,SQL_AFTER_GTIDS,SQL_BEFORE_GTIDS,SQL_BIG_RESULT,SQL_BUFFER_RESULT,' +
  'SQL_CACHE,SQL_CALC_FOUND_ROWS,SQL_NO_CACHE,SQL_SMALL_RESULT,SQL_THREAD,SQL_TSI_DAY,SQL_TSI_HOUR,SQL_TSI_MINUTE,SQL_TSI_MONTH,SQL_TSI_QUARTER,' +
  'SQL_TSI_SECOND,SQL_TSI_WEEK,SQL_TSI_YEAR,SQL_SAFE_UPDATES,SQL_SELECT_LIMIT,SQL_SLAVE_SKIP_COUNTER,SQL_WARNINGS,SSL,STACKED,START,STARTING,STARTS,' +
  'STATS_AUTO_RECALC,STATS_PERSISTENT,STATS_SAMPLE_PAGES,STATUS,STOP,STORAGE,STORED,STRAIGHT_JOIN,STRING,SUBCLASS_ORIGIN,SUBJECT,SUBPARTITION,SUBPARTITIONS,' +
  'SUPER,SUSPEND,SWAPS,SWEAGLE_CHECK,SWITCHES,SYSTEM,TABLE,TABLES,TABLESPACE,TEMPORARY,TEMPTABLE,TERMINATED,TEXT,THAN,THEN,TIME,TIMESTAMP,TIMESTAMPADD,' +
  'TIMESTAMPDIFF,TINYBLOB,TINYINT,TINYTEXT,TO,TRAILING,TRANSACTION,TRIGGER,TRIGGERS,TRUE,TRUNCATE,TYPE,TYPES,UNBOUNDED,UNCOMMITTED,UNDEFINED,UNDO,UNICODE,' +
  'UNINSTALL,UNION,UNIQUE,UNKNOWN,UNLOCK,UNSIGNED,UNTIL,UPDATE,UPGRADE,USAGE,USE,USER,USER_RESOURCES,USING,UTC_DATE,UTC_TIME,UTC_TIMESTAMP,VALIDATION,' +
  'VALUE,VALUES,VARBINARY,VARCHAR,VARCHARACTER,VARIABLES,VARYING,VIEW,VIRTUAL,VOID,WAIT,WARNINGS,WEEK,WEEKDAY,WEEKOFYEAR,WEIGHT_STRING,WHEN,WHERE,WHILE,' +
  'WINDOW,WITH,WITHOUT,WORK,WRAPPER,X509,XA,XID,YEAR,YEAR_MONTH,ZEROFILL,ZONE,ABSOLUTE,ALWAYS,ARRAY,COUNT,CUME_DIST,DENSE_RANK,DATABASE_DEFAULT,DUMMY,' +
  'EMPTY,EXCEPT,EXCLUDE,EXCLUSIVE,EXPRESSION,EXTERNAL,EXTRACT,False,FINAL,FOLLOWING,FREE,FUSION,G,GEOJSON,GLOB,GRANTS,GROUPING,HOLD,INITIAL,JAVA_JOIN_INFIX,' +
  'JSON_ARRAY,JSON_ARRAYAGG,JSON_EXISTS,JSON_OBJECT,JSON_OBJECTAGG,JSON_QUERY,JSON_TABLE,JSON_VALUE,L,LAG,LAST_VALUE,LATERAL,LEAD,LIKE,LINENO,LOAD_XML,' +
  'LOCATION,LOCALTIME,LOCALTIMESTAMP,LOCKED,LOG10,LOG2,MEMBER,MESSAGE_TEXT,MUTEX,NCHAR,NDB,NDBCLUSTER,NESTED,NEXT,NO,NODEGROUP,NONE,OCTET_LENGTH,OFFLINE,' +
  'OGR_GEOMETRY,OLD,ONLINE,OPTIONAL,ORDINALITY,ORGANIZATION,OTHERS,PAD,PARAMETER,POLYLINE,PRESERVE,PREV,PRIMARY,READS,REDOFILE,REPLICATE_DO_DB,' +
  'REPLICATE_DO_TABLE,REPLICATE_IGNORE_DB,REPLICATE_IGNORE_TABLE,REPLICATE_REWRITE_DB,REPLICATE_WILD_DO_TABLE,REPLICATE_WILD_IGNORE_TABLE,ROW_NUMBER,' +
  'SAMPLE,SAVEPOINT,SIGNAL,SOME,STATE,STATEMENT,STATIC,STD,STDDEV,STDDEV_POP,STDDEV_SAMP,TRIG,TRIM,UNDO_BUFFER_SIZE,UNDOFILE,USE_FRM,VAR_POP,VAR_SAMP,VERBOSE';
export default RESERVED_KEYWORDS;