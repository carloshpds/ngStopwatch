(function() {
  angular.module('ngStopwatch.services', []);

  angular.module('ngStopwatch.scripts', ['ngStopwatch.services']);

  angular.module('ngStopwatch', ['ngStopwatch.scripts']);

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZS5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0E7RUFBQSxPQUFPLENBQUMsTUFBUixDQUFlLHNCQUFmLEVBQTJDLEVBQTNDOztFQU1BLE9BQU8sQ0FBQyxNQUFSLENBQWUscUJBQWYsRUFBMkMsQ0FDekMsc0JBRHlDLENBQTNDOztFQVFBLE9BQU8sQ0FBQyxNQUFSLENBQWUsYUFBZixFQUE4QixDQUM1QixxQkFENEIsQ0FBOUI7QUFkQSIsImZpbGUiOiJtb2R1bGUuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyIjID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuIyBNb2R1bGVzXG4jID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuYW5ndWxhci5tb2R1bGUgJ25nU3RvcHdhdGNoLnNlcnZpY2VzJyAgICAsIFtdXG5cblxuIyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiMgU2NyaXB0cyBNb2R1bGVcbiMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5hbmd1bGFyLm1vZHVsZSAnbmdTdG9wd2F0Y2guc2NyaXB0cycgICAgICwgW1xuICAnbmdTdG9wd2F0Y2guc2VydmljZXMnXG5dXG5cblxuIyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiMgTWFpbiBNb2R1bGVcbiMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5hbmd1bGFyLm1vZHVsZSAnbmdTdG9wd2F0Y2gnLCBbXG4gICduZ1N0b3B3YXRjaC5zY3JpcHRzJ1xuICBdIl19
(function() {
  angular.module('ngStopwatch.services').service('stopwatch', ["$interval", function($interval) {
    var API, StopWatch, idController;
    idController = 0;
    StopWatch = (function() {
      function StopWatch(config) {
        var initial;
        this.id = ++idController;
        this.lapStarted = null;
        initial = {
          name: "timer" + idController,
          created: new Date().getTime(),
          current: 0,
          stopped: null,
          laps: [],
          currentLap: 0,
          lastLap: null,
          refreshRate: 100,
          running: false,
          autoRefresh: true
        };
        angular.merge(this, initial);
        this.interval = null;
        angular.merge(this, config);
        if (this.autoRefresh) {
          this.trackCurrent();
        }
        this.start();
      }

      StopWatch.prototype.getTime = function() {
        if (this.running) {
          this.stop();
        }
        return this.current;
      };

      StopWatch.prototype.start = function() {
        if (this.running) {
          return;
        }
        this.running = true;
        this.lastStart = new Date().getTime();
        if (!!this.autoRefresh) {
          return this.trackCurrent();
        }
      };

      StopWatch.prototype.stop = function() {
        var now;
        $interval.cancel(this.interval);
        this.interval = null;
        now = new Date().getTime();
        if (!this.running) {
          return;
        }
        this.running = false;
        this.stopped = now;
        this.current += this.stopped - this.lastStart;
        return this.currentLap += this.stopped - this.lastStart;
      };

      StopWatch.prototype.reset = function() {
        return angular.merge(this, {
          current: 0,
          stopped: null,
          laps: [],
          currentLap: 0,
          lastLap: null,
          running: false
        });
      };

      StopWatch.prototype.lap = function() {
        var now;
        if (!this.running) {
          return;
        }
        $interval.cancel(this.interval);
        this.interval = null;
        now = new Date().getTime();
        if (!this.autoRefresh) {
          this.current += now - this.lastStart;
          this.currentLap += now - this.lastStart;
          this.lastStart = now;
        }
        this.lastLap = this.currentLap;
        this.currentLap = 0;
        this.laps.push(this.lastLap);
        if (!!this.autoRefresh) {
          return this.trackCurrent();
        }
      };

      StopWatch.prototype.trackCurrent = function() {
        var self;
        if (this.running) {
          self = this;
          return this.interval = $interval(function() {
            var now;
            now = new Date().getTime();
            self.current += now - self.lastStart;
            self.currentLap += now - self.lastStart;
            return self.lastStart = now;
          }, this.refreshRate);
        } else {
          $interval.cancel(this.interval);
          return this.interval = null;
        }
      };

      return StopWatch;

    })();
    return API = {
      create: function(config) {
        return new StopWatch(config);
      }
    };
  }]);

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdHMvc2VydmljZS5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFBQSxPQUFPLENBQUMsTUFBUixDQUFlLHNCQUFmLENBQ0EsQ0FBQyxPQURELENBQ1MsV0FEVCxFQUNzQixTQUFDLFNBQUQ7QUFDcEIsUUFBQTtJQUFBLFlBQUEsR0FBZTtJQUNUO01BQ1MsbUJBQUMsTUFBRDtBQUNYLFlBQUE7UUFBQSxJQUFDLENBQUEsRUFBRCxHQUFNLEVBQUU7UUFDUixJQUFDLENBQUEsVUFBRCxHQUFjO1FBRWQsT0FBQSxHQUFVO1VBQ1IsSUFBQSxFQUFNLE9BQUEsR0FBUSxZQUROO1VBRVIsT0FBQSxFQUFhLElBQUEsSUFBQSxDQUFBLENBQU0sQ0FBQyxPQUFQLENBQUEsQ0FGTDtVQUdSLE9BQUEsRUFBUyxDQUhEO1VBSVIsT0FBQSxFQUFTLElBSkQ7VUFLUixJQUFBLEVBQU0sRUFMRTtVQU1SLFVBQUEsRUFBWSxDQU5KO1VBT1IsT0FBQSxFQUFTLElBUEQ7VUFRUixXQUFBLEVBQWEsR0FSTDtVQVNSLE9BQUEsRUFBUyxLQVREO1VBVVIsV0FBQSxFQUFhLElBVkw7O1FBYVYsT0FBTyxDQUFDLEtBQVIsQ0FBYyxJQUFkLEVBQWlCLE9BQWpCO1FBQ0EsSUFBQyxDQUFBLFFBQUQsR0FBWTtRQUVaLE9BQU8sQ0FBQyxLQUFSLENBQWMsSUFBZCxFQUFpQixNQUFqQjtRQUdBLElBQUcsSUFBQyxDQUFBLFdBQUo7VUFDRSxJQUFDLENBQUEsWUFBRCxDQUFBLEVBREY7O1FBR0EsSUFBQyxDQUFBLEtBQUQsQ0FBQTtNQTFCVzs7MEJBNkJiLE9BQUEsR0FBUyxTQUFBO1FBQ1AsSUFBRyxJQUFDLENBQUEsT0FBSjtVQUNFLElBQUMsQ0FBQSxJQUFELENBQUEsRUFERjs7QUFHQSxlQUFPLElBQUMsQ0FBQTtNQUpEOzswQkFNVCxLQUFBLEdBQU8sU0FBQTtRQUNMLElBQVUsSUFBQyxDQUFBLE9BQVg7QUFBQSxpQkFBQTs7UUFDQSxJQUFDLENBQUEsT0FB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dXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlICduZ1N0b3B3YXRjaC5zZXJ2aWNlcydcbi5zZXJ2aWNlICdzdG9wd2F0Y2gnLCAoJGludGVydmFsKS0+XG4gIGlkQ29udHJvbGxlciA9IDBcbiAgY2xhc3MgU3RvcFdhdGNoXG4gICAgY29uc3RydWN0b3I6IChjb25maWcpLT5cbiAgICAgIEBpZCA9ICsraWRDb250cm9sbGVyXG4gICAgICBAbGFwU3RhcnRlZCA9IG51bGxcblxuICAgICAgaW5pdGlhbCA9IHtcbiAgICAgICAgbmFtZTogXCJ0aW1lciN7aWRDb250cm9sbGVyfVwiXG4gICAgICAgIGNyZWF0ZWQ6IG5ldyBEYXRlKCkuZ2V0VGltZSgpXG4gICAgICAgIGN1cnJlbnQ6IDBcbiAgICAgICAgc3RvcHBlZDogbnVsbFxuICAgICAgICBsYXBzOiBbXVxuICAgICAgICBjdXJyZW50TGFwOiAwXG4gICAgICAgIGxhc3RMYXA6IG51bGxcbiAgICAgICAgcmVmcmVzaFJhdGU6IDEwMFxuICAgICAgICBydW5uaW5nOiBmYWxzZVxuICAgICAgICBhdXRvUmVmcmVzaDogdHJ1ZVxuICAgICAgfVxuXG4gICAgICBhbmd1bGFyLm1lcmdlIEAsIGluaXRpYWxcbiAgICAgIEBpbnRlcnZhbCA9IG51bGxcblxuICAgICAgYW5ndWxhci5tZXJnZSBALCBjb25maWdcblxuXG4gICAgICBpZiBAYXV0b1JlZnJlc2hcbiAgICAgICAgQHRyYWNrQ3VycmVudCgpXG5cbiAgICAgIEBzdGFydCgpXG5cblxuICAgIGdldFRpbWU6IC0+XG4gICAgICBpZiBAcnVubmluZ1xuICAgICAgICBAc3RvcCgpXG5cbiAgICAgIHJldHVybiBAY3VycmVudFxuXG4gICAgc3RhcnQ6IC0+XG4gICAgICByZXR1cm4gaWYgQHJ1bm5pbmdcbiAgICAgIEBydW5uaW5nID0gdHJ1ZVxuICAgICAgQGxhc3RTdGFydCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpXG5cbiAgICAgIHVubGVzcyAhQGF1dG9SZWZyZXNoXG4gICAgICAgIEB0cmFja0N1cnJlbnQoKVxuXG4gICAgc3RvcDogLT5cbiAgICAgICRpbnRlcnZhbC5jYW5jZWwoQGludGVydmFsKVxuICAgICAgQGludGVydmFsID0gbnVsbFxuICAgICAgbm93ID0gbmV3IERhdGUoKS5nZXRUaW1lKClcbiAgICAgIHJldHVybiBpZiAhQHJ1bm5pbmdcbiAgICAgIEBydW5uaW5nID0gZmFsc2VcbiAgICAgIEBzdG9wcGVkID0gbm93XG5cbiAgICAgIEBjdXJyZW50ICs9IEBzdG9wcGVkIC0gQGxhc3RTdGFydFxuICAgICAgQGN1cnJlbnRMYXAgKz0gQHN0b3BwZWQgLSBAbGFzdFN0YXJ0XG5cbiAgICByZXNldDogLT5cbiAgICAgIGFuZ3VsYXIubWVyZ2UgQCwge1xuICAgICAgICBjdXJyZW50OiAwXG4gICAgICAgIHN0b3BwZWQ6IG51bGxcbiAgICAgICAgbGFwczogW11cbiAgICAgICAgY3VycmVudExhcDogMFxuICAgICAgICBsYXN0TGFwOiBudWxsXG4gICAgICAgIHJ1bm5pbmc6IGZhbHNlXG4gICAgICB9XG5cblxuICAgIGxhcDogLT5cbiAgICAgIHJldHVybiBpZiAhQHJ1bm5pbmdcbiAgICAgICRpbnRlcnZhbC5jYW5jZWwoQGludGVydmFsKSAjIGNhbmNlbCBhbnkgcGVuZGluZyB0cmFja2luZ1xuICAgICAgQGludGVydmFsID0gbnVsbFxuICAgICAgbm93ID0gbmV3IERhdGUoKS5nZXRUaW1lKClcbiAgICAgIGlmICFAYXV0b1JlZnJlc2hcbiAgICAgICAgQGN1cnJlbnQgKz0gbm93IC0gQGxhc3RTdGFydFxuICAgICAgICBAY3VycmVudExhcCArPSBub3cgLSBAbGFzdFN0YXJ0XG4gICAgICAgIEBsYXN0U3RhcnQgPSBub3dcblxuICAgICAgQGxhc3RMYXAgPSBAY3VycmVudExhcFxuICAgICAgQGN1cnJlbnRMYXAgPSAwXG4gICAgICBAbGFwcy5wdXNoIEBsYXN0TGFwXG5cbiAgICAgIHVubGVzcyAhQGF1dG9SZWZyZXNoXG4gICAgICAgIEB0cmFja0N1cnJlbnQoKVxuXG4gICAgdHJhY2tDdXJyZW50OiAoKS0+XG4gICAgICBpZiBAcnVubmluZ1xuICAgICAgICBzZWxmID0gQFxuICAgICAgICBAaW50ZXJ2YWwgPSAkaW50ZXJ2YWwgLT5cbiAgICAgICAgICBub3cgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKVxuICAgICAgICAgIHNlbGYuY3VycmVudCArPSBub3cgLSBzZWxmLmxhc3RTdGFydFxuICAgICAgICAgIHNlbGYuY3VycmVudExhcCArPSBub3cgLSBzZWxmLmxhc3RTdGFydFxuICAgICAgICAgIHNlbGYubGFzdFN0YXJ0ID0gbm93XG4gICAgICAgICwgQHJlZnJlc2hSYXRlXG5cbiAgICAgIGVsc2VcbiAgICAgICAgJGludGVydmFsLmNhbmNlbChAaW50ZXJ2YWwpXG4gICAgICAgIEBpbnRlcnZhbCA9IG51bGxcblxuXG5cblxuXG4gIHJldHVybiBBUEkgPSB7XG4gICAgY3JlYXRlOiAoY29uZmlnKS0+XG4gICAgICByZXR1cm4gbmV3IFN0b3BXYXRjaChjb25maWcpXG4gIH1cbiJdfQ==