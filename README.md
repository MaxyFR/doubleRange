# Double Range Form

## Example of result that you will be obtain

![alt](https://github.com/MaxyFR/doubleRange/blob/main/doubleRangeScreen.JPG?raw=true)

## Get started

As shown in the example.html page, here is the minimum code to get the double range form :

```html
<!DOCTYPE html>
<html>
<head>
	<title>Double Range Example</title>
    <link rel="stylesheet" type="text/css" href="doubleRange.css"/>
</head>
<body>

    <form>
        <div id="doubleRange" class="doubleRange">
            <div class="barre">
                <div class="barreMilieu" style="width:50%; left:25%;"></div>
                <div class="t1 thumb" style="left:25%"></div>
                <div class="t2 thumb" style="left:75%;"></div>
            </div>
            <div class="label">de <span class="labelMin"></span> à <span class="labelMax"></span></div>
            <input type="hidden" name="pmin" value="" class="inputMin"/>
            <input type="hidden" name="pmax" value="" class="inputMax"/>
        </div>
    </form>

    <script type="text/javascript" src="doubleRange.js"></script>
    <script type="text/javascript">
        setDoubleRange({
            element: '#doubleRange',
            minValue: 0,
            maxValue: 50000,
            maxInfinite: true,
            stepValue: 1000,
	    defaultMinValue: 500,
	    defaultMaxValue: 10000,
            unite: '€'
        });
    </script>
</body>
</html>
```
The *"pmin"* and *"pmax"* fields will be automatically filled with the values chosen on the double range.

The labels *"labelMin"* and *"labelMax"* will also be instantly filled when the values change.

## Configuration

```javascript
setDoubleRange({
    element: '#doubleRange',
    minValue: 0,
    maxValue: 50000,
    maxInfinite: true,
    stepValue: 1000,
    defaultMinValue: 500,
    defaultMaxValue: 10000,
    unite: '€'
});
```

* **element :**  ID (*"#element"*) or Class (*".element"*) containing your double range
* **minValue :** Minimum bar value
* **maxValue :** Maximum bar value
* **MaxInfinite :** The value will be infinite if you move the cursor to the far right
* **stepValue :** The step of increasing or decreasing for the value
* **defaultMinValue:** Default left thumb value *(optional)*
* **defaultMaxValue:** Default right thumb value *(optional)*
* **unite :** The unit of your values
