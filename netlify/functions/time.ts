import { Handler, APIGatewayProxyEventV2, Context } from 'aws-lambda';

export const handler: Handler = async (event: APIGatewayProxyEventV2, context: Context) => {
    try {
        const now = new Date();
        const timeInfo = {
            timestamp: now.toISOString(),
            timezone: 'UTC',
            formatted: now.toLocaleString('en-US', { timeZone: 'UTC' })
        };

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                message: 'Current server time',
                time: timeInfo,
                requestId: context.awsRequestId
            })
        };
    } catch (error) {
        console.error('Error in time handler:', error);
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