export function getSSLPostgres(param_pg_ssl) {
    const obj_ssl_postgres = {
        ssl: false,
        extra: {
            ssl: {
            rejectUnauthorized: false,
            }
        }
    };
    
    if (param_pg_ssl === 'false' || param_pg_ssl === undefined) {
        return obj_ssl_postgres;
    } else {
        return { };
    }
}