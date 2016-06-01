function OnHttpStableConfig($httpProvider) {
    $httpProvider.interceptors.push('OnHttpStableInterceptor');
}

OnHttpStableConfig.$inject = [
    '$httpProvider'
];

export default OnHttpStableConfig;