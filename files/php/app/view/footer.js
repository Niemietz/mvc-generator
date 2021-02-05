exports.getText = function(author) {
    let result =
`<div class="row">
    <div class="col-12 col-sm-12 col-md-12 col-lg-12">
        Copyright © <?php echo date('Y'); ?> Developed by ${author}™. All rights reserved.
    </div>
</div>`

    return result
}