package media.dee.dcms.webapp.userprofile;

import media.dee.dcms.components.WebComponent;
import org.osgi.framework.Bundle;
import org.osgi.framework.FrameworkUtil;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.log.LogService;

import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonValue;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.concurrent.atomic.AtomicReference;

@Component
@WebComponent.Command.For(value="getData", component=ProfilePieItem.class)
public class PieItemGetDataCommand implements WebComponent.Command {
    private final AtomicReference<LogService> logRef = new AtomicReference<>();

    @Reference
    void setLogService( LogService log ) {
        logRef.set(log);
    }

    @Override
    public JsonValue execute(JsonValue... command) {
        Bundle bundle = FrameworkUtil.getBundle(this.getClass());
        URL dataURL = bundle.getResource(String.format("/data/pie/%s.json", ((JsonObject)command[0]).getInt("instanceID")));
        if( dataURL == null ){
            return Json.createObjectBuilder()
                    .add("action","error")
                    .add("code", "not-fount")
                    .build();
        }
        try (InputStream dataInStream = dataURL.openStream()){
            return Json.createReader(dataInStream).readObject();
        } catch (IOException ex){
            logRef.get().log(LogService.LOG_ERROR, "Error Reading data", ex);
            return Json.createObjectBuilder()
                    .add("action","error")
                    .add("code", ex.getMessage())
                    .build();
        }
    }
}
