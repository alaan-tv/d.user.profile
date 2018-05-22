package media.dee.dcms.core.webapp.userprofile;

import media.dee.dcms.core.components.AdminModule;
import media.dee.dcms.core.components.UUID;
import media.dee.dcms.core.components.WebComponent;
import org.osgi.service.component.ComponentContext;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.log.LogService;

import java.util.concurrent.atomic.AtomicReference;


@AdminModule(value = "userprofile", resource = "/webapp", autoInstall = true)
@Component
@UUID("3ecbd060-dd59-4d9a-a2cc-ca41f1562a4a")
public class ProfilePieItem implements WebComponent {

    private final AtomicReference<LogService> logRef = new AtomicReference<>();


    @Reference
    void setLogService( LogService log ) {
        logRef.set(log);
    }


    @Activate
    void activate(ComponentContext ctx) {
        LogService log = logRef.get();
        log.log(LogService.LOG_INFO, "ProfilePieItem Activated");
    }

}
