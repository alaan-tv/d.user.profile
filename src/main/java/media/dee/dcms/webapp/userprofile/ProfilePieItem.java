package media.dee.dcms.webapp.userprofile;

import media.dee.dcms.components.AdminModule;
import media.dee.dcms.components.UUID;
import media.dee.dcms.components.WebComponent;
import org.osgi.framework.Bundle;
import org.osgi.framework.FrameworkUtil;
import org.osgi.service.component.ComponentContext;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.event.Event;
import org.osgi.service.event.EventConstants;
import org.osgi.service.event.EventHandler;
import org.osgi.service.log.LogService;

import javax.json.*;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.atomic.AtomicReference;
import java.util.function.BiConsumer;
import java.util.function.Consumer;


@AdminModule(value = "/webapp/userprofile", autoInstall = true)
@Component(property= EventConstants.EVENT_TOPIC + "=component/3ecbd060-dd59-4d9a-a2cc-ca41f1562a4a")
@UUID("3ecbd060-dd59-4d9a-a2cc-ca41f1562a4a")
public class ProfilePieItem implements WebComponent, EventHandler {

    private final AtomicReference<LogService> logRef = new AtomicReference<>();
    private Map<String, BiConsumer<JsonObject, Consumer<JsonValue>>> commands = new HashMap<>();

    public ProfilePieItem(){
        commands.put("getData", (message, response)->{
            Bundle bundle = FrameworkUtil.getBundle(this.getClass());
            URL dataURL = bundle.getResource(String.format("/data/pie/%s.json", message.getInt("instanceID")));
            if( dataURL == null ){
                response.accept(
                        Json.createObjectBuilder()
                        .add("action","error")
                        .add("code", "not-fount")
                        .build()
                );
                return;
            }
            try {
                InputStream dataInStream = dataURL.openStream();
                response.accept(Json.createReader(dataInStream).readObject());
                dataInStream.close();
            } catch (IOException ex){
                logRef.get().log(LogService.LOG_ERROR, "Error Reading data", ex);
            }
        });
    }


    @Reference
    void setLogService( LogService log ) {
        logRef.set(log);
    }


    @Activate
    void activate(ComponentContext ctx) {
        LogService log = logRef.get();
        log.log(LogService.LOG_INFO, "ProfilePieItem Activated");
    }

    @SuppressWarnings("unchecked")
    @Override
    public void handleEvent(Event event) {

        Consumer<JsonValue> response = (Consumer<JsonValue>) event.getProperty("response");
        JsonObject message = (JsonObject) event.getProperty("message");

        JsonArray cmdList = message.getJsonArray("parameters");
        cmdList.forEach( (cmdObject)->{
            String command = ((JsonObject)cmdObject).getString("command");
            if (commands.containsKey(command))
                commands.get(command).accept((JsonObject)cmdObject, response);
        });

    }
}
