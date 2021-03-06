ComboboxViewModel = function () {
};

ComboboxViewModel.prototype = {
    getData: function (options) {
    }
};

var defaults = function () {
    return {        
        rowTemplate: "",
        valueMember: "name"
    }
};

asyncTest("When datasource is called", function () {
    var model = new ComboboxViewModel();
    var options = defaults();

    options.dataSource = function () {
        equal(model, this, "The keyword this should have correct scope");
        start();
    }

    var combobox = new ko.bindingHandlers.combobox.ViewModel(options, model, ko.observable());
    combobox.searchText("A");
});

asyncTest("When datasource is binded to other scope than ViewModel", function () {
    var model = new ComboboxViewModel();
    var options = defaults();

    options.dataSource = function () {
        equal(this, "TEST", "The keyword this should have correct scope");
        start();
    } .bind("TEST");

    var combobox = new ko.bindingHandlers.combobox.ViewModel(options, model, ko.observable());
    combobox.searchText("A");
});

asyncTest("When text is shorter than supplied in options", function () {
    var model = new ComboboxViewModel();
    var options = defaults();
    options.minimumSearchTextLength = 2;

    options.dataSource = function () {
        ok(false, "It should not search");
    };

    setTimeout(function () {
        ok(true);
        start();
    }, 300);

    var combobox = new ko.bindingHandlers.combobox.ViewModel(options, model, ko.observable());
    combobox.searchText("A");
});

asyncTest("When text is longer than supplied in options", function () {
    var model = new ComboboxViewModel();
    var options = defaults();
    options.minimumSearchTextLength = 2;

    options.dataSource = function () {
        ok(true, "It should do search");
        start();
    };

    var combobox = new ko.bindingHandlers.combobox.ViewModel(options, model, ko.observable());
    combobox.searchText("Abc");
});

test("When no items are in list and navigating", function () {
    var model = new ComboboxViewModel();
    var options = defaults();

    var combobox = new ko.bindingHandlers.combobox.ViewModel(options, model, ko.observable());
    combobox.navigate(1);

    ok(true, "Should not throw error");
});

test("When selected is set to null", function () {
    var model = new ComboboxViewModel();
    var options = defaults();

    var selected = ko.observable({ name: "Test" });
    var combobox = new ko.bindingHandlers.combobox.ViewModel(options, model, selected);
    equal(combobox.searchText(), "Test", "The preselected value should be correct");

    selected(null);

    equal(combobox.searchText(), null, "It should have updated text in combobox");
});