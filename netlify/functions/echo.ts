import { Handler, APIGatewayProxyEventV2, Context } from 'aws-lambda';

export const handler: Handler = async (event: APIGatewayProxyEventV2, context: Context) => {
    try {
        if (event.requestContext.http.method !== 'POST') {
            return {
                statusCode: 405,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    error: 'Method Not Allowed. Use POST.'
                })
            };
        }

        const body = event.body ? JSON.parse(event.body) : {};
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                message: 'Echoing your request body',
                received: body,
                requestId: context.awsRequestId
            })
        };
    } catch (error) {
        console.error('Error in echo handler:', error);
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                error: 'Internal Server Error'
            })
        };
    }
};