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
        now = new Date().getTime();
        if (!this.running) {
          return;
        }
        $interval.cancel(this.interval);
        this.running = false;
        this.stopped = now;
        this.current += this.stopped - this.lastStart;
        return this.currentLap += this.stopped - this.lastStart;
      };

      StopWatch.prototype.reset = function() {
        return angular.merge(this, {
          created: null,
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
        return this.interval = $interval((function(_this) {
          return function() {
            var now;
            now = new Date().getTime();
            _this.current += now - _this.lastStart;
            _this.currentLap += now - _this.lastStart;
            return _this.lastStart = now;
          };
        })(this), this.refreshRate);
      };

      return StopWatch;

    })();
    return API = {
      create: function(config) {
        var timer;
        timer = new StopWatch(config);
        return timer;
      }
    };
  }]);

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdHMvc2VydmljZS5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFBQSxPQUFPLENBQUMsTUFBUixDQUFlLHNCQUFmLENBQ0EsQ0FBQyxPQURELENBQ1MsV0FEVCxFQUNzQixTQUFDLFNBQUQ7QUFDcEIsUUFBQTtJQUFBLFlBQUEsR0FBZTtJQUNUO01BQ1MsbUJBQUMsTUFBRDtBQUNYLFlBQUE7UUFBQSxJQUFDLENBQUEsRUFBRCxHQUFNLEVBQUU7UUFDUixJQUFDLENBQUEsVUFBRCxHQUFjO1FBRWQsT0FBQSxHQUFVO1VBQ1IsSUFBQSxFQUFNLE9BQUEsR0FBUSxZQUROO1VBRVIsT0FBQSxFQUFhLElBQUEsSUFBQSxDQUFBLENBQU0sQ0FBQyxPQUFQLENBQUEsQ0FGTDtVQUdSLE9BQUEsRUFBUyxDQUhEO1VBSVIsT0FBQSxFQUFTLElBSkQ7VUFLUixJQUFBLEVBQU0sRUFMRTtVQU1SLFVBQUEsRUFBWSxDQU5KO1VBT1IsT0FBQSxFQUFTLElBUEQ7VUFRUixXQUFBLEVBQWEsR0FSTDtVQVNSLE9BQUEsRUFBUyxLQVREO1VBVVIsV0FBQSxFQUFhLElBVkw7O1FBYVYsT0FBTyxDQUFDLEtBQVIsQ0FBYyxJQUFkLEVBQWlCLE9BQWpCO1FBQ0EsSUFBQyxDQUFBLFFBQUQsR0FBWTtRQUVaLE9BQU8sQ0FBQyxLQUFSLENBQWMsSUFBZCxFQUFpQixNQUFqQjtRQUdBLElBQUcsSUFBQyxDQUFBLFdBQUo7VUFDRSxJQUFDLENBQUEsWUFBRCxDQUFBLEVBREY7O1FBR0EsSUFBQyxDQUFBLEtBQUQsQ0FBQTtNQTFCVzs7MEJBNkJiLE9BQUEsR0FBUyxTQUFBO1FBQ1AsSUFBRyxJQUFDLENBQUEsT0FBSjtVQUNFLElBQUMsQ0FBQSxJQUFELENBQUEsRUFERjs7QUFHQSxlQUFPLElBQUMsQ0FBQTtNQUpEOzswQkFNVCxLQUFBLEdBQU8sU0FBQTtRQUNMLElBQVUsSUFBQyxDQUFBLE9BQVg7QUFBQSxpQkFBQTs7UUFDQSxJQUFDLENBQUEsT0FBRCxHQUFXO1FBQ1gsSUFBQyxDQUFBLFNBQUQsR0FBaUIsSUFBQSxJQUFBLENBQUEsQ0FBTSxDQUFDLE9BQVAsQ0FBQTtRQUVqQixJQUFBLENBQU8sQ0FBQyxJQUFDLENBQUEsV0FBVDtpQkFDRSxJQUFDLENBQUEsWUFBRCxDQUFBLEVBREY7O01BTEs7OzBCQVFQLElBQUEsR0FBTSxTQUFBO0FBQ0osWUFBQTtRQUFBLEdBQUEsR0FBVSxJQUFBLElBQUEsQ0FBQSxDQUFNLENBQUMsT0FBUCxDQUFBO1FBQ1YsSUFBVSxDQUFDLElBQUMsQ0FBQSxPQUFaO0FBQUEsaUJBQUE7O1FBQ0EsU0FBUyxDQUFDLE1BQVYsQ0FBaUIsSUFBQyxDQUFBLFFBQWxCO1FBQ0EsSUFBQyxDQUFBLE9BQUQsR0FBVztRQUNYLElBQUMsQ0FBQSxPQUFELEdBQVc7UUFFWCxJQUFDLENBQUEsT0FBRCxJQUFZLElBQUMsQ0FBQSxPQUFELEdBQVcsSUFBQyxDQUFBO2VBQ3hCLElBQUMsQ0FBQSxVQUFELElBQWUsSUFBQyxDQUFBLE9BQUQsR0FBVyxJQUFDLENBQUE7TUFSdkI7OzBCQVVOLEtBQUEsR0FBTyxTQUFBO2VBQ0wsT0FBTyxDQUFDLEtBQVIsQ0FBYyxJQUFkLEVBQWlCO1VBQ2YsT0FBQSxFQUFTLElBRE07VUFFZixPQUFBLEVBQVMsQ0FGTTtVQUdmLE9BQUEsRUFBUyxJQUhNO1VBSWYsSUFBQSxFQUFNLEVBSlM7VUFLZixVQUFBLEVBQVksQ0FMRztVQU1mLE9BQUEsRUFBUyxJQU5NO1VBT2YsT0FBQSxFQUFTLEtBUE07U0FBakI7TUFESzs7MEJBWVAsR0FBQSxHQUFLLFNBQUE7QUFDSCxZQUFBO1FBQUEsSUFBVSxDQUFDLElBQUMsQ0FBQSxPQUFaO0FBQUEsaUJBQUE7O1FBQ0EsU0FBUyxDQUFDLE1BQVYsQ0FBaUIsSUFBQyxDQUFBLFFBQWxCO1FBQ0EsR0FBQSxHQUFVLElBQUEsSUFBQSxDQUFBLENBQU0sQ0FBQyxPQUFQLENBQUE7UUFDVixJQUFHLENBQUMsSUFBQyxDQUFBLFdBQUw7VUFDRSxJQUFDLENBQUEsT0FBRCxJQUFZLEdBQUEsR0FBTSxJQUFDLENBQUE7VUFDbkIsSUFBQyxDQUFBLFVBQUQsSUFBZSxHQUFBLEdBQU0sSUFBQyxDQUFBO1VBQ3RCLElBQUMsQ0FBQSxTQUFELEdBQWEsSUFIZjs7UUFPQSxJQUFDLENBQUEsT0FBRCxHQUFXLElBQUMsQ0FBQTtRQUNaLElBQUMsQ0FBQSxVQUFELEdBQWM7UUFDZCxJQUFDLENBQUEsSUFBSSxDQUFDLElBQU4sQ0FBVyxJQUFDLENBQUEsT0FBWjtRQUVBLElBQUEsQ0FBTyxDQUFDLElBQUMsQ0FBQSxXQUFUO2lCQUNFLElBQUMsQ0FBQSxZQUFELENBQUEsRUFERjs7TUFmRzs7MEJBa0JMLFlBQUEsR0FBYyxTQUFBO2VBQ1osSUFBQyxDQUFBLFFBQUQsR0FBWSxTQUFBLENBQVUsQ0FBQSxTQUFBLEtBQUE7aUJBQUEsU0FBQTtBQUNwQixnQkFBQTtZQUFBLEdBQUEsR0FBVSxJQUFBLElBQUEsQ0FBQSxDQUFNLENBQUMsT0FBUCxDQUFBO1lBQ1YsS0FBQyxDQUFBLE9BQUQsSUFBWSxHQUFBLEdBQU0sS0FBQyxDQUFBO1lBQ25CLEtBQUMsQ0FBQSxVQUFELElBQWUsR0FBQSxHQUFNLEtBQUMsQ0FBQTttQkFDdEIsS0FBQyxDQUFBLFNBQUQsR0FBYTtVQUpPO1FBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFWLEVBS1YsSUFBQyxDQUFBLFdBTFM7TUFEQTs7Ozs7QUFZaEIsV0FBTyxHQUFBLEdBQU07TUFDWCxNQUFBLEVBQVEsU0FBQyxNQUFEO0FBQ04sWUFBQTtRQUFBLEtBQUEsR0FBWSxJQUFBLFNBQUEsQ0FBVSxNQUFWO0FBQ1osZUFBTztNQUZELENBREc7O0VBbEdPLENBRHRCO0FBQUEiLCJmaWxlIjoic2NyaXB0cy9zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhci5tb2R1bGUgJ25nU3RvcHdhdGNoLnNlcnZpY2VzJ1xuLnNlcnZpY2UgJ3N0b3B3YXRjaCcsICgkaW50ZXJ2YWwpLT5cbiAgaWRDb250cm9sbGVyID0gMFxuICBjbGFzcyBTdG9wV2F0Y2hcbiAgICBjb25zdHJ1Y3RvcjogKGNvbmZpZyktPlxuICAgICAgQGlkID0gKytpZENvbnRyb2xsZXJcbiAgICAgIEBsYXBTdGFydGVkID0gbnVsbFxuXG4gICAgICBpbml0aWFsID0ge1xuICAgICAgICBuYW1lOiBcInRpbWVyI3tpZENvbnRyb2xsZXJ9XCJcbiAgICAgICAgY3JlYXRlZDogbmV3IERhdGUoKS5nZXRUaW1lKClcbiAgICAgICAgY3VycmVudDogMFxuICAgICAgICBzdG9wcGVkOiBudWxsXG4gICAgICAgIGxhcHM6IFtdXG4gICAgICAgIGN1cnJlbnRMYXA6IDBcbiAgICAgICAgbGFzdExhcDogbnVsbFxuICAgICAgICByZWZyZXNoUmF0ZTogMTAwXG4gICAgICAgIHJ1bm5pbmc6IGZhbHNlXG4gICAgICAgIGF1dG9SZWZyZXNoOiB0cnVlXG4gICAgICB9XG5cbiAgICAgIGFuZ3VsYXIubWVyZ2UgQCwgaW5pdGlhbFxuICAgICAgQGludGVydmFsID0gbnVsbFxuXG4gICAgICBhbmd1bGFyLm1lcmdlIEAsIGNvbmZpZ1xuXG5cbiAgICAgIGlmIEBhdXRvUmVmcmVzaFxuICAgICAgICBAdHJhY2tDdXJyZW50KClcblxuICAgICAgQHN0YXJ0KClcblxuXG4gICAgZ2V0VGltZTogLT5cbiAgICAgIGlmIEBydW5uaW5nXG4gICAgICAgIEBzdG9wKClcblxuICAgICAgcmV0dXJuIEBjdXJyZW50XG5cbiAgICBzdGFydDogLT5cbiAgICAgIHJldHVybiBpZiBAcnVubmluZ1xuICAgICAgQHJ1bm5pbmcgPSB0cnVlXG4gICAgICBAbGFzdFN0YXJ0ID0gbmV3IERhdGUoKS5nZXRUaW1lKClcblxuICAgICAgdW5sZXNzICFAYXV0b1JlZnJlc2hcbiAgICAgICAgQHRyYWNrQ3VycmVudCgpXG5cbiAgICBzdG9wOiAtPlxuICAgICAgbm93ID0gbmV3IERhdGUoKS5nZXRUaW1lKClcbiAgICAgIHJldHVybiBpZiAhQHJ1bm5pbmdcbiAgICAgICRpbnRlcnZhbC5jYW5jZWwoQGludGVydmFsKVxuICAgICAgQHJ1bm5pbmcgPSBmYWxzZVxuICAgICAgQHN0b3BwZWQgPSBub3dcblxuICAgICAgQGN1cnJlbnQgKz0gQHN0b3BwZWQgLSBAbGFzdFN0YXJ0XG4gICAgICBAY3VycmVudExhcCArPSBAc3RvcHBlZCAtIEBsYXN0U3RhcnRcblxuICAgIHJlc2V0OiAtPlxuICAgICAgYW5ndWxhci5tZXJnZSBALCB7XG4gICAgICAgIGNyZWF0ZWQ6IG51bGxcbiAgICAgICAgY3VycmVudDogMFxuICAgICAgICBzdG9wcGVkOiBudWxsXG4gICAgICAgIGxhcHM6IFtdXG4gICAgICAgIGN1cnJlbnRMYXA6IDBcbiAgICAgICAgbGFzdExhcDogbnVsbFxuICAgICAgICBydW5uaW5nOiBmYWxzZVxuICAgICAgfVxuXG5cbiAgICBsYXA6IC0+XG4gICAgICByZXR1cm4gaWYgIUBydW5uaW5nXG4gICAgICAkaW50ZXJ2YWwuY2FuY2VsKEBpbnRlcnZhbCkgIyBjYW5jZWwgYW55IHBlbmRpbmcgdHJhY2tpbmdcbiAgICAgIG5vdyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpXG4gICAgICBpZiAhQGF1dG9SZWZyZXNoXG4gICAgICAgIEBjdXJyZW50ICs9IG5vdyAtIEBsYXN0U3RhcnRcbiAgICAgICAgQGN1cnJlbnRMYXAgKz0gbm93IC0gQGxhc3RTdGFydFxuICAgICAgICBAbGFzdFN0YXJ0ID0gbm93XG5cbiAgICAgICMgQGN1cnJlbnRMYXAgKz0gbm93IC0gQGxhc3RTdGFydFxuXG4gICAgICBAbGFzdExhcCA9IEBjdXJyZW50TGFwXG4gICAgICBAY3VycmVudExhcCA9IDBcbiAgICAgIEBsYXBzLnB1c2ggQGxhc3RMYXBcblxuICAgICAgdW5sZXNzICFAYXV0b1JlZnJlc2hcbiAgICAgICAgQHRyYWNrQ3VycmVudCgpXG5cbiAgICB0cmFja0N1cnJlbnQ6ICgpLT5cbiAgICAgIEBpbnRlcnZhbCA9ICRpbnRlcnZhbCA9PlxuICAgICAgICBub3cgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKVxuICAgICAgICBAY3VycmVudCArPSBub3cgLSBAbGFzdFN0YXJ0XG4gICAgICAgIEBjdXJyZW50TGFwICs9IG5vdyAtIEBsYXN0U3RhcnRcbiAgICAgICAgQGxhc3RTdGFydCA9IG5vd1xuICAgICAgLCBAcmVmcmVzaFJhdGVcblxuXG5cblxuXG4gIHJldHVybiBBUEkgPSB7XG4gICAgY3JlYXRlOiAoY29uZmlnKS0+XG4gICAgICB0aW1lciA9IG5ldyBTdG9wV2F0Y2goY29uZmlnKVxuICAgICAgcmV0dXJuIHRpbWVyXG4gIH1cbiJdfQ==