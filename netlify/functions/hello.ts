import { Handler, APIGatewayProxyEventV2, Context } from 'aws-lambda';

export const handler: Handler = async (event: APIGatewayProxyEventV2, context: Context) => {
    try {
        const queryParams = event.queryStringParameters || {};
        const name = queryParams.name || 'Guest';

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                message: `Hello, ${name}! Welcome to the Netlify CLI template.`,
                requestId: context.awsRequestId
            })
        };
    } catch (error) {
        console.error('Error in hello handler:', error);
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