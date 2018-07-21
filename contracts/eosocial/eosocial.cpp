#include "eosocial.hpp"

// @abi action debug
void eosocial::debug() {
    print("trying 8 times");
}

// @abi action write
void eosocial::write(const account_name author, const string content) {
    print("[ write::start ]");

    post_table post(_self, _self);
    require_auth(author);

    post_id id;
    get_post_id(id);

    uint64_t post_id = id.id++;
    print(" ## post_id: ", post_id);
    print(" ## author: ", author);

    post.emplace(author, [&](auto& data) {
        data.id = post_id;
        data.content = content;
        data.author = author;
        data.created = now();
    });

    set_post_id(id);
    print(" ## [ write::end ]");
}

// @abi action update
void eosocial::update(const uint64_t post_id, const account_name author, const string content) {
    print("[ update::start ]");

    post_table post(_self, _self);
    require_auth(author);

    auto post_iter = post.find(post_id);
    eosio_assert(post_iter != post.end(), "Post doesn't exist");

    post.modify(post_iter, 0, [&](auto& data) {
        data.content = content;
        data.updated = now();
    });

    print(" ## post_id: ", post_id, " updated.");
    print(" ## [ update::end ]");
}

// @abi action remove
void eosocial::remove(const uint64_t post_id) {
    post_table post(_self, _self);

    auto post_iter = post.find(post_id);

    if (post_iter == post.end()) {
        print("Post does not exist.");
    }

    if (post_iter->id == post_id) {
        require_auth(post_iter->author);
        post.erase(post_iter);
        print("Post deleted.");
    }
}

// @abi action vote
void eosocial::vote(const uint64_t post_id, const account_name author) {
    poll_table poll(_self, _self);

    auto poll_lookup = poll.find(post_id);
    eosio_assert(poll_lookup != poll.end(), "Vote does not exist.");

    // eosio::print("upvote post: ", post_id)
    // eosio::print("downvote post: ", post_id)
}
