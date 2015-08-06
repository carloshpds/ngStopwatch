(function() {
  angular.module('App').config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.state("home", {
      url: "/",
      templateUrl: "app/features/home/home.html",
      controller: "HomeCtrl"
    });
    return $urlRouterProvider.otherwise('/');
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZlYXR1cmVzL2hvbWUvcm91dGVzLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFLQTtFQUFBLE9BQU8sQ0FBQyxNQUFSLENBQWUsS0FBZixDQUtFLENBQUMsTUFMSCxDQUtVLFNBQUMsY0FBRCxFQUFpQixrQkFBakI7SUFFTixjQUNFLENBQUMsS0FESCxDQUNTLE1BRFQsRUFFSTtNQUFBLEdBQUEsRUFBYyxHQUFkO01BQ0EsV0FBQSxFQUFjLDZCQURkO01BRUEsVUFBQSxFQUFjLFVBRmQ7S0FGSjtXQU1BLGtCQUFrQixDQUFDLFNBQW5CLENBQTZCLEdBQTdCO0VBUk0sQ0FMVjtBQUFBIiwiZmlsZSI6ImZlYXR1cmVzL2hvbWUvcm91dGVzLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsiXG5cbiMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4jIE1haW4gTW9kdWxlXG4jID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuYW5ndWxhci5tb2R1bGUgJ0FwcCdcblxuICAjID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAjIENvbmZpZyBUd2FpblxuICAjID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAuY29uZmlnICgkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSAtPlxuXG4gICAgJHN0YXRlUHJvdmlkZXJcbiAgICAgIC5zdGF0ZSBcImhvbWVcIixcbiAgICAgICAgdXJsICAgICAgICAgOiBcIi9cIlxuICAgICAgICB0ZW1wbGF0ZVVybCA6IFwiYXBwL2ZlYXR1cmVzL2hvbWUvaG9tZS5odG1sXCJcbiAgICAgICAgY29udHJvbGxlciAgOiBcIkhvbWVDdHJsXCJcblxuICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UgJy8nIl19