(function ($) {
    /**
     * Handle custom date formatting using flatpickr
     */
    const addDateFormatHandler = ($element) => {
        const dateFields = $element.find('input[type="date"][data-date-format]');
        dateFields.each((index, input) => {
            const $input = $(input);
            const format = $input.data('date-format') || 'Y-m-d';

            if(!$input.hasClass('cool-form-use-native')){
                setTimeout(()=>{
                    if (typeof flatpickr !== 'undefined') {
                        flatpickr(input, {
                            dateFormat: format
                        });
                    }
                },100)
            }

            if(format !== 'Y-m-d'){
                $input.removeAttr('pattern');
                // const regexPattern = convertFormatToPattern(format);
                // $input.attr('pattern', regexPattern);
            }
        });
    };

    // Helper: Convert date format string (e.g. Y-m-d) to regex pattern
    const convertFormatToPattern = (format) => {
        let pattern = format;

        pattern = pattern.replace(/Y/, '[0-9]{4}');
        pattern = pattern.replace(/m/, '[0-9]{2}');
        pattern = pattern.replace(/d/, '[0-9]{2}');
        pattern = pattern.replace(/-/g, '-'); // keep dashes
        pattern = pattern.replace(/\//g, '\\/'); // escape slashes if used

        return pattern;
    };

    /**
     * Elementor frontend hook for form widget
     */
    $(window).on('elementor/frontend/init', () => {
        elementorFrontend.hooks.addAction('frontend/element_ready/cool-form.default', addDateFormatHandler);
    });

})(jQuery);
