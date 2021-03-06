'use strict';
var appToken = 'admcmy1zd91c';
var reg;
var sub;
var isSubscribed = false;
var subscribeButton = document.querySelector('button');
if ('serviceWorker' in navigator) {
    console.log('Service Worker is supported');
  navigator.serviceWorker.register('sw.js').then(function() {
    return navigator.serviceWorker.ready;
  }).then(function(serviceWorkerRegistration) {
    reg = serviceWorkerRegistration;

    subscribeButton.disabled = false;
    console.log('Service Worker is ready :^)', reg);
  }).catch(function(error) {
    console.log('Service Worker Error :^(', error);
  });
}

subscribeButton.addEventListener('click', function() {
  if (isSubscribed) {
    unsubscribe();
  } else {
    subscribe();
  }
});

function subscribe() {
  console.log('sooomething');
  alert('before subscribtion');
  reg.pushManager.subscribe({userVisibleOnly: true}).
  then(function(pushSubscription){
    sub = pushSubscription;
    console.log('Subscribed! Endpoint:' , sub.enpoint);
    subscribeButton.textContent = 'Unsubscribe';
    isSubscribed = true;
  });
}

function unsubscribe() {
  sub.unsubscribe().then(function(event) {
    subscribeButton.textContent = 'Subscribe';
    console.log('Unsubscribed!', event);
    isSubscribed = false;
  }).catch(function(error) {
    console.log('Error unsubscribing', error);
    subscribeButton.textContent = 'Subscribe';
  });
}

function doObjCThing() {
  var adjustEvent = new AdjustEvent('abc123')
  adjustEvent.addPartnerParameter('key', 'value')
  adjustEvent.addPartnerParameter('foo', 'bar')

  Adjust.trackEvent(adjustEvent)
}

function adjustAndroidStart() {

  var yourAppToken = appToken;
  var environment = AdjustConfig.EnvironmentSandbox;
  var adjustConfig = new AdjustConfig(AdjustBridge, yourAppToken, environment);

  Adjust.onCreate(adjustConfig);
}