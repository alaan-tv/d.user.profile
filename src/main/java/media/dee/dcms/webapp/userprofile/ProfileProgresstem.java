package media.dee.dcms.webapp.userprofile;

import media.dee.dcms.components.AdminModule;
import media.dee.dcms.components.UUID;
import media.dee.dcms.webapp.cms.components.GUIComponent;
import org.osgi.service.component.ComponentContext;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.event.Event;
import org.osgi.service.event.EventConstants;
import org.osgi.service.event.EventHandler;
import org.osgi.service.log.LogService;

import javax.json.*;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.atomic.AtomicReference;
import java.util.function.BiConsumer;
import java.util.function.Consumer;


@AdminModule(value = "/webapp/userprofile", autoInstall = true)
@Component(property= EventConstants.EVENT_TOPIC + "=component/5d4b2f67-ee47-4a84-947d-d9b65d94e3ab")
@UUID("5d4b2f67-ee47-4a84-947d-d9b65d94e3ab")
public class ProfileProgresstem implements GUIComponent, EventHandler {
    private final AtomicReference<LogService> logRef = new AtomicReference<>();
    private Map<String, BiConsumer<JsonObject, Consumer<JsonValue>>> commands = new HashMap<>();

    public ProfileProgresstem(){
        commands.put("getData", (message, response)->{
            int rest = 100;
            JsonArrayBuilder data = Json.createArrayBuilder();

            for( int i = 0; i < 3; ++i) {
                int value = (int)(Math.random() * rest);
                rest -= value;
                data.add(value);
            }

            JsonObject result = Json.createObjectBuilder()
                    .add("datasets", Json.createArrayBuilder().add(
                            Json.createObjectBuilder()
                                    .add("data", data)
                                    .add("backgroundColor", Json.createArrayBuilder().add("#FF6384").add("#36A2EB").add("#FFCE56").build())
                                    .add("hoverBackgroundColor", Json.createArrayBuilder().add("#FF6384").add("#36A2EB").add("#FFCE56").build())
                    ).build())
                    .add("labels", Json.createArrayBuilder().add("Red").add("Green").add("Yellow").build())
                    .build();

            response.accept(result);
        });
    }


    @Reference
    void setLogService( LogService log ) {
        logRef.set(log);
    }


    @Activate
    void activate(ComponentContext ctx) {
        LogService log = logRef.get();
        log.log(LogService.LOG_INFO, "ProfileProgresstem Activated");
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
