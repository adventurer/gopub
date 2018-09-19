   
    $(function() {
        // validation needs name of the element
        $('#food').multiselect();

        // initialize after multiselect
        $('#basic-form').parsley();

        //Multi-select
        $('#optgroup').multiSelect({ selectableOptgroup: true });
    });    