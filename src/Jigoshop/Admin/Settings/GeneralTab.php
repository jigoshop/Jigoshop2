<?php

namespace Jigoshop\Admin\Settings;

use Jigoshop\Core\Options;
use Jigoshop\Helper\Country;
use Jigoshop\Helper\Currency;
use Jigoshop\Helper\Scripts;
use WPAL\Wordpress;

/**
 * General tab definition.
 *
 * @package Jigoshop\Admin\Settings
 */
class GeneralTab implements TabInterface
{
	const SLUG = 'general';

	/** @var array */
	private $options;

	public function __construct(Wordpress $wp, Options $options)
	{
		$this->options = $options->get(self::SLUG);
		$wp->addAction('admin_enqueue_scripts', function (){
			if (!isset($_GET['tab']) || $_GET['tab'] != GeneralTab::SLUG) {
				return;
			}

			$states = array();
			foreach (Country::getAllStates() as $country => $stateList) {
				foreach ($stateList as $code => $state) {
					$states[$country][] = array('id' => $code, 'text' => $state);
				}
			}

			Scripts::add('jigoshop.admin.settings.general', JIGOSHOP_URL.'/assets/js/admin/settings/general.js', array('jquery'), array('page' => 'jigoshop_page_jigoshop_settings'));
			Scripts::localize('jigoshop.admin.settings.general', 'jigoshop_admin_general', array(
				'states' => $states,
			));
		});
	}

	/**
	 * @return string Title of the tab.
	 */
	public function getTitle()
	{
		return __('General', 'jigoshop');
	}

	/**
	 * @return string Tab slug.
	 */
	public function getSlug()
	{
		return self::SLUG;
	}

	/**
	 * @return array List of items to display.
	 */
	public function getSections()
	{
		return array(
			array(
				'title' => __('Main', 'jigoshop'),
				'id' => 'main',
				'fields' => array(
					array(
						'id' => 'country',
						'name' => '[country]',
						'title' => __('Shop location (country)', 'jigoshop'),
						'type' => 'select',
						'value' => $this->options['country'],
						'options' => Country::getAll(),
					),
					array(
						'id' => 'state',
						'name' => '[state]',
						'title' => __('Shop location (state)', 'jigoshop'),
						'type' => 'text',
						'value' => $this->options['state'],
					),
					array(
						'name' => '[email]',
						'title' => __('Administrator e-mail', 'jigoshop'),
						'type' => 'text',
						'value' => $this->options['email'],
					),
					array(
						'name' => '[show_message]',
						'id' => 'show_message',
						'title' => __('Display custom message?', 'jigoshop'),
						'type' => 'checkbox',
						'checked' => $this->options['show_message'],
						'tip' => __('Add custom message on top of each page of your website.', 'jigoshop'),
						'classes' => array('switch-medium'),
					),
					array(
						'name' => '[message]',
						'id' => 'custom_message',
						'title' => __('Message text', 'jigoshop'),
						'type' => 'text',
						'value' => $this->options['message'],
						'classes' => array($this->options['show_message'] ? '' : 'not-active'),
					),
				),
			),
			array(
				'title' => __('Pricing', 'jigoshop'),
				'id' => 'pricing',
				'fields' => array(
					array(
						'name' => '[currency]',
						'title' => __('Currency', 'jigoshop'),
						'type' => 'select',
						'value' => $this->options['currency'],
						'options' => Currency::countries(),
					),
					array(
						'name' => '[currency_position]',
						'title' => __('Currency position', 'jigoshop'),
						'type' => 'select',
						'value' => $this->options['currency_position'],
						'options' => Currency::positions(),
					),
					array(
						'name' => '[currency_decimals]',
						'title' => __('Number of decimals', 'jigoshop'),
						'type' => 'text',
						'value' => $this->options['currency_decimals'],
					),
					array(
						'name' => '[currency_thousand_separator]',
						'title' => __('Thousands separator', 'jigoshop'),
						'type' => 'text',
						'value' => $this->options['currency_thousand_separator'],
					),
					array(
						'name' => '[currency_decimal_separator]',
						'title' => __('Decimal separator', 'jigoshop'),
						'type' => 'text',
						'value' => $this->options['currency_decimal_separator'],
					),
				),
			),
			array(
				'title' => __('Company details', 'jigoshop'),
				'description' => __('These details with shop location are used for invoicing and sent to customer via emails.', 'jigoshop'),
				'id' => 'company',
				'fields' => array(
					array(
						'name' => '[company_name]',
						'title' => __('Name', 'jigoshop'),
						'type' => 'text',
						'value' => $this->options['company_name'],
					),
					array(
						'name' => '[company_address_1]',
						'title' => __('Address (first line)', 'jigoshop'),
						'type' => 'text',
						'value' => $this->options['company_address_1'],
					),
					array(
						'name' => '[company_address_2]',
						'title' => __('Address (second line)', 'jigoshop'),
						'type' => 'text',
						'value' => $this->options['company_address_2'],
					),
					array(
						'name' => '[company_tax_number]',
						'title' => __('Tax number', 'jigoshop'),
						'description' => __('Add your tax registration label before the registration number and it will be printed as well. eg. <code>VAT Number: 88888888</code>', 'jigoshop'),
						'type' => 'text',
						'value' => $this->options['company_tax_number'],
					),
					array(
						'name' => '[company_phone]',
						'title' => __('Phone number', 'jigoshop'),
						'type' => 'text',
						'value' => $this->options['company_phone'],
					),
					array(
						'name' => '[company_email]',
						'title' => __('Email', 'jigoshop'),
						'type' => 'text',
						'value' => $this->options['company_email'],
					),
				),
			),
			array(
				'title' => __('Emails', 'jigoshop'),
				'id' => 'emails',
				'fields' => array(
					array(
						'name' => '[emails][from]',
						'title' => __('From name', 'jigoshop'),
						'description' => __('Name shown in all Jigoshop emails.', 'jigoshop'),
						'type' => 'text',
						'value' => $this->options['emails']['from'],
					),
					array(
						'name' => '[emails][footer]',
						'title' => __('Footer', 'jigoshop'),
						'description' => __('The email footer used in all Jigoshop emails.', 'jigoshop'),
						'type' => 'textarea',
						'value' => $this->options['emails']['footer'],
					),
				),
			),
		);
	}

	/**
	 * Validate and sanitize input values.
	 *
	 * @param array $settings Input fields.
	 *
	 * @return array Sanitized and validated output.
	 * @throws ValidationException When some items are not valid.
	 */
	public function validate($settings)
	{
		$settings['show_message'] = $settings['show_message'] == 'on';

		return $settings;
	}
}
