import {ProfileMenuItem} from './ProfileMenuItem';
import {ProfileProgressItem} from './dashboard/ProfileProgressItem';
import {ProfilePieItem} from './dashboard/ProfilePieItem';
import UserProfilePanel from "./panels/UserProfilePanel";
import UserTasksPanel from "./panels/UserTasks";
import {extendObservable} from 'mobx';
import React from 'react';

defineModule([], ()=> {

    let serviceRegistry = [];

    let taskBadge = extendObservable({}, {
        variant: 'info',
        text: 5
    });

    let notificationRegistry;

    return {
        activator: {
            start: (context)=>{
                console.info('User-Profile Components Activated');

                notificationRegistry = globalEmitter.addListener('ws:notification', (data)=>{
                    taskBadge.text = data.notifications;
                });

                serviceRegistry.push(
                    context.registerService('d.cms.ui.component.NavigationMenuItem', (context, props)=>{
                        return React.createElement(ProfileMenuItem, props , null);
                    }, {id: 'd318d2a9-95ac-46fa-b1a1-a9bffc796962'})
                );

                serviceRegistry.push(
                    context.registerService('d.cms.ui.component.Dashboard.Card', ProfilePieItem, {id: ProfilePieItem.uuid})
                );

                serviceRegistry.push(
                    context.registerService('d.cms.ui.component.Dashboard.Card', ProfileProgressItem, {
                        id: ProfileProgressItem.uuid
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
                            badge: taskBadge
                        },
                            {
                                name: 'My Tasks',
                                url: '/tasks',
                                path: '/tasks',
                                icon: 'fa fa-tasks',
                                component: UserTasksPanel,
                                badge: taskBadge
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
                            component: UserProfilePanel,
                            badge: taskBadge
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
                notificationRegistry.remove();
            }
        },
        initializer: new Promise( (resolve, reject)=>{
            setTimeout(resolve, 500);
        } ),
        exports:{}
    };

});