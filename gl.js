// select a.v_index_code,a.v_index_name,a.v_unit,
// (case when a.v_unit = '万平方' then round(t.n_value/10000,2)
// when t.n_value = null then '--'
// else t.n_value end
// ) as n_value,
// --decode(a.v_unit,'万平方',round(t.n_value/10000,2),t.n_value) as n_value,
// dim.property_value，dim.n_sort
// from t_base_index a
// left join t_home_index b
// on a.v_index_code = b.v_index_code
// left join t_index_data t
// on a.v_index_code = t.v_index_code
// left join dim_dictionary dim
// on a.v_index_type = dim.property_value
// where 1=1
// --and a.v_index_type = '5'
// and a.v_index_code not in ('SQ_INDEX_001')
// and a.n_index_level = '1'
// {and dim.property_value not in ($type$)}
// and t.v_dim_area_code = 'JT'
// order by dim.n_sort,b.n_sort