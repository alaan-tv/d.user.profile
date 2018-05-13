package media.dee.dcms.webapp.userprofile;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import media.dee.dcms.components.WebComponent;
import org.osgi.framework.Bundle;
import org.osgi.framework.FrameworkUtil;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.log.LogService;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.concurrent.atomic.AtomicReference;

@Component
@WebComponent.Command.For(value="getData", component=ProfileTrafficItem.class)
public class TrafficItemGetDataCommand implements WebComponent.Command {

    private final AtomicReference<LogService> logRef = new AtomicReference<>();
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Reference
    void setLogService( LogService log ) {
        logRef.set(log);
    }

    @Override
    public JsonNode execute(JsonNode... command) {
        Bundle bundle = FrameworkUtil.getBundle(this.getClass());
        URL dataURL = bundle.getResource(String.format("/data/traffic/%s.json", command[0].get("instanceID").asInt()));
        if( dataURL == null ){
            return objectMapper.createObjectNode()
                    .put("action","error")
                    .put("code", "not-fount");
        }
        try (InputStream dataInStream = dataURL.openStream()){
            return objectMapper.readValue(dataInStream, ObjectNode.class);
        } catch (IOException ex){
            logRef.get().log(LogService.LOG_ERROR, "Error Reading data", ex);
            return objectMapper.createObjectNode()
                    .put("action","error")
                    .put("code", ex.getMessage());
        }
    }
}
