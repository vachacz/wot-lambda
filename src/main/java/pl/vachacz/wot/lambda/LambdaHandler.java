package pl.vachacz.wot.lambda;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;

public class LambdaHandler implements RequestHandler<Request, Response> {

    public Response handleRequest(Request input, Context context) {
        return new Response();
    }

}
