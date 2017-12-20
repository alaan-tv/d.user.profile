import {ProfileMenuItem} from './ProfileMenuItem';
import {ProfileProgressItem} from './dashboard/ProfileProgressItem';
import {ProfilePieItem} from './dashboard/ProfilePieItem';
import UserProfilePanel from "./panels/UserProfilePanel";
import UserTasksPanel from "./panels/UserTasks";
import {request} from "../../../../../../../d.cms/cms-web-app/src/main/front-end/javascript/transport/Request";

defineModule(['react'], (React)=> {

    let serviceRegistry = [];

    return {
        activator: {
            start: (context)=>{
                console.info('User-Profile Components Activated');

                serviceRegistry.push(
                    context.registerService('d.cms.ui.component.NavigationMenuItem', (context, props)=>{
                        return React.createElement(ProfileMenuItem, props , null);
                    }, {id: 'd318d2a9-95ac-46fa-b1a1-a9bffc796962'})
                );

                serviceRegistry.push(
                    context.registerService('d.cms.ui.component.Dashboard.Card', (context, props)=>{
                        return ProfilePieItem;
                    }, {id: '3ecbd060-dd59-4d9a-a2cc-ca41f1562a4a'})
                );

                serviceRegistry.push(
                    context.registerService('d.cms.ui.component.Dashboard.Card', (context, props)=>{
                        return ProfileProgressItem;
                    }, {
                        id: '5d4b2f67-ee47-4a84-947d-d9b65d94e3ab',
                        roles: ['editor-in-chief', 'system-admin', 'site-manager']
                    })
                );


                serviceRegistry.push(
                    context.registerService(
                        'd.cms.ui.router',
                        [{
                            name: 'My Profile',
                            url: '/profile',
                            path: '/profile',
                            icon: 'fa fa-user',
                            component: UserProfilePanel,
                            badge:{
                                variant: 'info',
                                text: 'new'
                            }
                        },
                            {
                                name: 'My Tasks',
                                url: '/tasks',
                                path: '/tasks',
                                icon: 'fa fa-tasks',
                                component: UserTasksPanel,
                                badge:{
                                    variant: 'info',
                                    text: 'new'
                                }
                            }],
                        {
                            order: 'last'
                        }
                    )
                );

                serviceRegistry.push(
                    context.registerService(
                        'd.cms.ui.router',
                        [{
                            name: 'Settings',
                            url: '/settings',
                            path: '/settings',
                            icon: 'fa fa-cog',
                            component: UserProfilePanel
                        }],
                        {
                            order: 'first'
                        }
                    )
                );

            },
            stop: (context)=>{
                console.info('User-Profile Components Deactivated');
                serviceRegistry.forEach( r => r.unregister() );
            }
        },
        initializer: new Promise( (resolve, reject)=>{
            resolve();
        } ),
        exports:{}
    };

});