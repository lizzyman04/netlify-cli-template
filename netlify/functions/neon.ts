import { Handler, APIGatewayProxyEvent, Context } from 'aws-lambda';

export const handler: Handler = async (event: APIGatewayProxyEvent, context: Context) => {
    try {
        if (event.httpMethod !== 'GET') {
            return {
                statusCode: 405,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET'
                },
                body: JSON.stringify({
                    error: 'Method Not Allowed. Use GET.'
                })
            };
        }

        // Placeholder for Neon database integration
        // TODO: When ready, install 'pg' (yarn add pg) and add Neon logic here
        // Example: Connect to Neon Postgres using process.env.DATABASE_URL
        /*
        import { Pool } from 'pg';
        const pool = new Pool({ connectionString: process.env.DATABASE_URL });
        const client = await pool.connect();
        try {
            const result = await client.query('SELECT NOW()');
            return { statusCode: 200, body: JSON.stringify(result.rows) };
        } finally {
            client.release();
        }
        */

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                message: 'Neon extension endpoint ready',
                requestId: context.awsRequestId
            })
        };
    } catch (error) {
        console.error('Error in neon handler:', error);
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                error: 'Internal Server Error',
                details: error instanceof Error ? error.message : 'Unknown error'
            })
        };
    }
};