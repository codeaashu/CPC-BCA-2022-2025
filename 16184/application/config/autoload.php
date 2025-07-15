<?php
defined('BASEPATH') or exit('No direct script access allowed');


$autoload['packages'] = array();


$autoload['libraries'] = array('database', 'session', 'form_validation', 'upload', 'cart');


$autoload['drivers'] = array();


$autoload['helper'] = array('form', 'url', 'file', 'option', 'text');


$autoload['config'] = array();


$autoload['language'] = array();


$autoload['model'] = array('category_model', 'manageorder_model', 'brand_model', 'product_model', 'slider_model', 'option_model', 'web_model');
