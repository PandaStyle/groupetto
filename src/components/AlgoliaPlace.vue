<script>
    import places from 'places.js'


    export default {
        props: {
            options: {
                type: Object,
                default: {},
            },
            value: String,
        },
        ready() {
            this.$nextTick(function () {
                const Events = ['']

                // put together options
                const options = Object.assign({}, this.options, {type: 'address', container: '#agolia'})

                // create algolia-places instance and save it as a prop

                this.place = places(options)

                // create closure for event callbacks
                const self = this

                // create event callbacks for all algolia-places events
                Events.forEach(function(eventName) {

                    self.place.on(eventName, function(event) {

                        self.$emit(eventName, event)

                    })

                })

            })
        },
        beforeDestroy() {
            // clean up so event bindings get removed etc.
            this.place.destroy()
        }
    }
</script>

<template>
    <input id="agolia" type="search" :value="value" ref="input" placeholder="Where are we going?">
</template>